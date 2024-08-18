import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import uuid from 'uuid'
import cors from 'cors';
dotenv.config()
const app = express()
const {Pool} = require('pg')
app.use(cors());
const { PORT, USER, PASSWORD } = process.env
const SERVICE_NAME = "AuthService"

const pool = new Pool({
    user: USER,
    host: 'localhost',
    database: 'AuthService',
    password: PASSWORD,
    port: 5432,
})

pool.query('CREATE TABLE IF NOT EXISTS sessions (session_id SERIAL PRIMARY KEY, session_token TEXT, session_timestamp TIMESTAMP, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id))').catch((e: string) => console.log(e))


app.use(express.json())


//externo

interface UserRegisteredEvent {
    username: string,
    password: string,
    id: number,
    isAdmin: boolean,
}

// interno
interface ValidationRequest {
    username: string,
    password: string,
}

//
interface ValidationSuccessfulResponse {
    session_token: string
}



interface UserValidatedEvent{
    session_id:number,
    session_token: string,
    validation_timestamp:string,
    user_id:number
}

let generateSession = async function (username: string): Promise<UserValidatedEvent>{
    let session_token = uuid.v4()
    let result = await pool.query('SELECT user_id FROM users WHERE user_name = $1', [username])
    let user_id = result.rows[0].user_id
    let insertResult = await pool.query('INSERT INTO sessions (session_token, session_timestamp, user_id) VALUES ($1, $2, $3) RETURNING *', [session_token, new Date().toISOString(), user_id])
    return {
        session_id: insertResult.rows[0].session_id,
        session_token: insertResult.rows[0].session_token,
        validation_timestamp: insertResult.rows[0].validation_timestamp,
        user_id: insertResult.rows[0].user_id
    }
}

let validate = async function (username: string, password: string): Promise<boolean>{
    //acessa o banco de dados para validar

    let result = await pool.query('SELECT user_password FROM users WHERE user_name = $1', [username])
    let user_password = result.rows[0].user_password
    return user_password === password
}


app.post('/validate', async function(req, res){
    const validationRequest: ValidationRequest = req.body

    try {
        let isValid: boolean = await validate(validationRequest.username, validationRequest.password)

        if (isValid) {
            let userValidatedEvent: UserValidatedEvent = await generateSession(validationRequest.username)
            axios.post('http://localhost:10000/event', { service_name: SERVICE_NAME, payload: userValidatedEvent, event_type: "userValidatedSuccessfulEvent" })
                .catch(() => console.log("erro no barramento"))

            let validationSuccessfulResponse: ValidationSuccessfulResponse = { session_token: userValidatedEvent.session_token}
            res.status(200).json(validationSuccessfulResponse)
        }
        else {
            res.status(400).json({ error: 'User validation failed' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Internal server error' })
    }
});

axios.post('http://localhost:10000/service-discovery', { service_name: SERVICE_NAME, host: 'localhost', port: PORT }).catch(() => console.log("erro no barramento"))

let events: Record<string, (arg:any)=>Promise<any>> = {
    "userValidatedSuccessfulEvent": async (userValidatedEvent:UserValidatedEvent)=>{
        console.log("novo usuario autenticou " + userValidatedEvent.session_token)
    },
    "userRegisteredEvent":async (userRegisteredEvent:UserRegisteredEvent) =>{
        await pool.query('INSERT INTO users (user_id, user_name, user_password, user_is_admin) VALUES ($1, $2, $3, $4)', [userRegisteredEvent.id, userRegisteredEvent.username, userRegisteredEvent.password, userRegisteredEvent.isAdmin])
        console.log(`novo usuario registrado ${userRegisteredEvent.username}`)
    }
}

interface Event{
    payload:string
    event_type:string
}
app.post('/event',  async (req, res) => {
    let {payload,event_type}:Event = req.body;
    let event = events[event_type];
    if(event){
        try {
            await event(payload);
        }
        catch (e) {
            console.log(`error treating event: ${event_type}, message: ${e}`)
            res.status(500).json({ error: `error treating event: ${event_type}, message: ${e}`})
        }
    }
    res.end()

});
const OnStartup = async (n : number) => {
    axios.post('http://localhost:10000/lost-events-recovery', { service_name: SERVICE_NAME }).catch(() => console.log("erro no barramento")).catch(e => {
        //sleep for 5 seconds
        if(n > 0){
            setTimeout(() => OnStartup(n - 1), 5000)
        }
    })
}

OnStartup(10).then(() => {
    app.listen(PORT, () => console.log(`AuthService. Port: ${PORT}.`))
})
