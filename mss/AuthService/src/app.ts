import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
const {Pool} = require('pg')

const { PORT, USER, PASSWORD } = process.env
const SERVICE_NAME = "AuthService"

const pool = new Pool({
    user: USER,
    host: 'localhost',
    database: 'AuthService',
    password: PASSWORD,
    port: 5432,
})



app.use(express.json())


//externo
const AddUserToDatabase = async (username: string, password: string) => {
    return pool.query('SELECT user_id FROM users WHERE user_name = $1', [username])
}


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
    auth_token: string
}



interface UserValidatedEvent{
    auth_token: string,
    validation_timestamp:string,
}

//
let fake_banco: Record<string, string> = {
    felipe:"1234"
}

let validate = async function (username: string, password: string): Promise<boolean>{
    //acessa o banco de dados para validar

    let result = await pool.query('SELECT user_password FROM users WHERE user_name = $1', [username])
    let user_password = result.rows[0].user_password
    return user_password === password
}

let createToken = async function (username: string, password: string): Promise<string>{
    return "token teste"
}


app.post('/validate', async function(req, res){
    const validationRequest: ValidationRequest = req.body

    try {
        let isValid: boolean = await validate(validationRequest.username, validationRequest.password)
        let auth_token: string = await createToken(validationRequest.username, validationRequest.password)

        if (isValid) {
            let userValidatedEvent: UserValidatedEvent = { auth_token: auth_token, validation_timestamp: new Date().toISOString() }
            axios.post('http://localhost:10000/event', { service_name: SERVICE_NAME, payload: userValidatedEvent, event_type: "userValidatedSuccessfulEvent" })
                .catch(() => console.log("erro no barramento"))

            let validationSuccessfulResponse: ValidationSuccessfulResponse = { auth_token: auth_token }
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



let events: Record<string, (arg:any)=>Promise<any>> = {
    "userValidatedSuccessfulEvent": async (userValidatedEvent:UserValidatedEvent)=>{
        console.log("novo usuario autenticou " + userValidatedEvent.auth_token)
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


app.listen(PORT, () => console.log(`AuthService. Port: ${PORT}.`))
