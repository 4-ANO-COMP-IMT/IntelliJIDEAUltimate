import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LP2',
    password: 'A0013734',
    port: 5432,
})
app.use(express.json())


// pool.query(`
// DROP TABLE IF EXISTS users CASCADE;
// CREATE TABLE users (
//  user_id SERIAL PRIMARY KEY,
//  user_name TEXT,
//  user_password TEXT,
//  user_is_admin BOOLEAN
// )
// `)



const { PORT } = process.env

//
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
    try {
        let result = await pool.query('SELECT user_password FROM users WHERE user_name = $1', [username])
        let user_password = result.rows[0].user_password
        return user_password === password
    }catch (e){
        console.log(e)
        return false
    }
}


app.post('/validate', async function(req, res){
    const validationRequest : ValidationRequest = req.body

    let isValid : boolean = await validate(validationRequest.username,validationRequest.password)
    let auth_token : string = "asdygahskgdhkasgdhsadh"
    if (isValid){
        let userValidatedEvent : UserValidatedEvent = {auth_token:auth_token,validation_timestamp:""}
        axios.post('http://localhost:10000/event', {payload: userValidatedEvent,eventType: "userValidatedSuccessfulEvent"}).catch(()=>console.log("erro no barramento"))
        let validationSuccessfulResponse:ValidationSuccessfulResponse = {auth_token:auth_token}
        res.status(200).json(validationSuccessfulResponse)
    }else{
        res.status(400).send('User validation failed')
    }
    res.end()
});



let events: Record<string, Function> = {
    "userValidatedSuccessfulEvent":(userValidatedEvent:UserValidatedEvent)=>{
        console.log("novo usuario autenticou " + userValidatedEvent.auth_token)
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
