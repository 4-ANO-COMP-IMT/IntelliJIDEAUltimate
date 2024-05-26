import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
app.use(express.json())

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
    let userRegisteredEvent : UserRegisteredEvent = {username: user.username, password: user.password, id: user.id, isAdmin: user.isAdmin}
    axios.post('http://localhost:10000/event', {payload: userRegisteredEvent,eventType: "userRegisteredEvent"}).catch(()=>console.log("erro no barramento"))
    res.status(200).send(userRegisteredEvent)
    res.end()
});



let events: Record<string, Function> = {
    "userRegisteredEvent":(userRegisteredEvent: UserRegisteredEvent)=>{
        console.log("Novo usuário registrado: ", userRegisteredEvent.username + " Com o id: " + userRegisteredEvent.id)
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
