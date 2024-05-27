
// region setup
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
app.use(express.json())
const { PORT, USER, PASSWORD } = process.env
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

*/

app.use(express.json())
// endregion


// region external interfaces

interface UserValidatedEvent{
    auth_token: string,
    validation_timestamp:string,
}

// endregion

// region internal interfaces

interface RegisterRequest {
    new_username: string,
    new_password: string,
}

interface User {
    username: string,
    password: string,
    id: number,
    isAdmin: boolean,
}

interface UserRegisteredEvent {
    username: string,
    password: string,
    id: number,
    isAdmin: boolean,
}

// endregion

// region internal functions

/**
 * @deprecated This function is deprecated. Use `AddUserToDatabase` instead.
 */
let CreateUser = (username: string, password: string): User => {
    return {username: username, password: password, id: 1, isAdmin: false}
}

const AddUserToDatabase = async (username: string, password: string) => {
    await pool.query('INSERT INTO users (user_name, user_password, user_is_admin) VALUES ($1, $2, $3)', [username, password, false])
    return pool.query('SELECT user_id FROM users WHERE user_name = $1', [username])
}

// endregion

// region post
app.post('/register', function(req, res){
    const registerRequest : RegisterRequest = req.body
    let user : User = CreateUser(registerRequest.new_username,registerRequest.new_password)

     AddUserToDatabase(user.username, user.password).then(r => {
        user.id = r.rows[0].user_id;
        console.log("Usuário registrado: ", user.username + " Com o id: " + r.rows[0].user_id)
    }).catch(e => console.log(e))
    let userRegisteredEvent : UserRegisteredEvent = {username: user.username, password: user.password, id: user.id, isAdmin: user.isAdmin}
    axios.post('http://localhost:10000/event', {payload: userRegisteredEvent,eventType: "userRegisteredEvent"}).catch(()=>console.log("erro no barramento"))
    res.status(200).send(userRegisteredEvent)
    res.end()
});

// endregion

//region event

let events: Record<string, (arg:any)=>Promise<any>> = {
    "userValidatedSuccessfulEvent": async (userValidatedEvent:UserValidatedEvent)=>{
        console.log("novo usuario autenticou " + userValidatedEvent.auth_token)
    },
    "userRegisteredEvent":async (userRegisteredEvent:UserRegisteredEvent) =>{
        console.log(`novo usuario registrado ${userRegisteredEvent.username}`)
    }
}

interface Event{
    payload:string
    eventType:string
}

app.post('/event',  async (req, res) => {
    let {payload,eventType}:Event = req.body;
    let event = events[eventType];
    if(event){
        try {
            await event(payload);
        }
        catch (e) {
            console.log(`error treating event: ${eventType}, message: ${e}`)
            res.status(500).json({ error: `error treating event: ${eventType}, message: ${e}`})
        }
    }

});

// endregion

app.listen(PORT, () => console.log(`AuthService. Port: ${PORT}.`))
