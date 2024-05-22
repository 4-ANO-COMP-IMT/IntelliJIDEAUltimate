import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
import {validateHeaderName} from "node:http";
const app = express()
app.use(express.json())

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
let validate = function (username: string, password: string): boolean{
    //acessa o banco de dados para validar
    return fake_banco[username] === password;
};


app.post('/validate', function(req, res){
    const validationRequest : ValidationRequest = req.body

    let isValid : boolean = validate(validationRequest.username,validationRequest.password)
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
