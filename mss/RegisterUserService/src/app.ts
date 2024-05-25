import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
app.use(express.json())
const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LP2',
    password: 'A0013734',
    port: 5432,
})
app.use(express.json())

const AddUserToDatabase = async (username: string, password: string) => {
    await pool.query('INSERT INTO users (user_name, user_password, user_is_admin) VALUES ($1, $2, $3)', [username, password, false])
    return pool.query('SELECT user_id FROM users WHERE user_name = $1', [username])
}




const { PORT } = process.env

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

let CreateUser = (username: string, password: string): User => {
    return {username: username, password: password, id: 1, isAdmin: false}
}



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



let events: Record<string, Function> = {
    "userRegisteredEvent":(userRegisteredEvent: UserRegisteredEvent)=>{
    }
}

interface Event{
    payload:string
    eventType:string
}
app.post('/event', (req, res) => {
    let {payload,eventType}:Event = req.body;
    let event = events[eventType];
    if(event){
        event(payload);
    }

});


app.listen(PORT, () => console.log(`AuthService. Port: ${PORT}.`))
