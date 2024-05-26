import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())

const { PORT } = process.env
app.post('/event', (req, res) => {
    const evento = req.body
    axios.post('http://localhost:1000/event', evento)
    axios.post('http://localhost:2000/event', evento)
    res.end()
})

app.listen(PORT, () => console.log(`Barramento. Porta: ${PORT}.`))
