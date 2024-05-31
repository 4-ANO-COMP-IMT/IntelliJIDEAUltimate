
// region setup
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
app.use(express.json())
const { PORT, USER, PASSWORD } = process.env
const SERVICE_NAME = "RegisterUserService"
const {Pool} = require('pg')

const pool = new Pool({
    user: USER,
    host: 'localhost',
    database: 'RegisterUserService',
    password: PASSWORD,
    port: 5432,
})

/*  *** CRIAÇÃO DA TABELA

DROP TABLE IF EXISTS users CASCADE;
CREATE table users (
	user_id SERIAL PRIMARY KEY,
	user_name TEXT,
	user_password TEXT,
	user_is_admin BOOLEAN
);

pool.query('CREATE TABLE IF NOT EXISTS sessions (session_id SERIAL PRIMARY KEY, session_token TEXT, session_timestamp TIMESTAMP, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id))').catch((e: string) => console.log(e))


*/

app.use(express.json())
// endregion


// region external interfaces

interface UserValidatedEvent{
    session_id:number,
    session_token: string,
    validation_timestamp:string,
    user_id:number
}

// endregion

// region internal interfaces

interface RegisterRequest {
    new_username: string,
    new_password: string,
}

interface User {
    user_name: string,
    user_password: string,
    user_id: number,
    user_is_admin: boolean,
}

interface UserRegisteredEvent {
    username: string,
    password: string,
    id: number,
    isAdmin: boolean,
}

// endregion

// region internal functions

const AddUserToDatabase = async (username: string, password: string) => {
    const res = await pool.query('INSERT INTO users (user_name, user_password, user_is_admin) VALUES ($1, $2, $3) RETURNING *', [username, password, false])
    return res
}

// endregion

// region post
app.post('/register', async function(req, res){
    const registerRequest : RegisterRequest = req.body

    const r = await AddUserToDatabase(registerRequest.new_username, registerRequest.new_password)
    try {
    const user:User = r.rows[0]
    console.log("Usuário registrado: ", user.user_name + " Com o id: " + user.user_id)
    let userRegisteredEvent : UserRegisteredEvent = {username: user.user_name, password: user.user_password, id: user.user_id, isAdmin: user.user_is_admin}
    axios.post('http://localhost:10000/event', {service_name: SERVICE_NAME, payload: userRegisteredEvent,event_type: "userRegisteredEvent"}).catch(()=>console.log("erro no barramento"))
    res.status(200).send(userRegisteredEvent)
    } catch (e) {
        console.log('Caught Exception:\n' + e)
    }
    res.end()
    
});

// endregion

//region event

let events: Record<string, (arg:any)=>Promise<any>> = {
    "userValidatedSuccessfulEvent": async (userValidatedEvent:UserValidatedEvent)=>{
        await pool.query('INSERT INTO sessions (session_id, session_token, session_timestamp, user_id) VALUES ($1, $2, $3, $4)', [userValidatedEvent.session_id, userValidatedEvent.session_token, userValidatedEvent.validation_timestamp, userValidatedEvent.user_id] )
        console.log("novo usuario autenticou " + userValidatedEvent.session_token)
    },
    "userRegisteredEvent":async (userRegisteredEvent:UserRegisteredEvent) =>{
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

// endregion

app.listen(PORT, () => console.log(`RegisterUser service. Port: ${PORT}.`))
