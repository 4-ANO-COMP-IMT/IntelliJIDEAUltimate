import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import axios from 'axios'
const app = express()
app.use(express.json())
const {Pool} = require('pg')

const { PORT, USER, PASSWORD } = process.env

const pool = new Pool({
    user: USER,
    host: 'localhost',
    database: 'EventBusService',
    password: PASSWORD,
    port: 5432,
})

/*  *** CRIAÇÃO DA TABELA

DROP TABLE IF EXISTS Services CASCADE;
CREATE TABLE Services (
	service_name VARCHAR(20) PRIMARY KEY,
	host VARCHAR(30),
	port INTEGER
);

DROP TABLE IF EXISTS LostEvents CASCADE;
CREATE TABLE LostEvents (
	lost_event_id SERIAL PRIMARY KEY,
	target_service VARCHAR(20),
	emitter_service VARCHAR(20),
	event_type VARCHAR(20),
	payload JSON,
	FOREIGN KEY (target_service) REFERENCES Services (service_name),
	FOREIGN KEY (emitter_service) REFERENCES Services (service_name)
	ON DELETE CASCADE ON UPDATE CASCADE
);

*/

interface Service {
    service_name: string
    host: string
    port: number
}

interface Event {
    service_name: string
    payload: Object
    event_type: string
}

interface Lost_Event {
    lost_event_id: number
    target_service: string
    emitter_service: string
    event_type: string
    payload: Object

}

const AddServiceToDatabase = async (service_name: string, host: string, port: number) => {
    await pool.query('INSERT INTO Services (service_name, host, port) VALUES ($1, $2, $3) ON CONFLICT (service_name) DO UPDATE SET host = EXCLUDED.host, port = EXCLUDED.port', [service_name, host, port])
}

const AddLostServiceToDatabase = async (target_service: string, emitter_service: string, event_type: string, payload: Object) => {
    await pool.query('INSERT INTO LostEvents (target_service, emitter_service, event_type, payload) VALUES ($1, $2, $3, $4)', [target_service, emitter_service, event_type, payload])
}

const RemoveLostServiceFromDatabase = async(lost_event_id: number) => {
    await pool.query('DELETE FROM LostEvents WHERE lost_event_id = $1', [lost_event_id])
}

const getServices = async function(): Promise<Array<Service>> {
    return (await pool.query('SELECT * FROM Services')).rows
}

app.post('/event', async (req, res) => {
    console.log("Barramento recebeu event...")
    const event: Event = req.body
    const services: Array<Service> = await getServices()

    services.forEach(s => {
        axios.post(`http://${s.host}:${s.port}/event`, event).catch(
            () => {AddLostServiceToDatabase(s.service_name, event.service_name, event.event_type, event.payload)}
        )
    });
    res.end()
})

app.post('/service-discovery', async (req, res) => {
    const {service_name, host, port}: Service = req.body
    await AddServiceToDatabase(service_name, host, port)
    res.end()
})

app.post('/lost-events-recovery', async (req, res) => {
    const {service_name} = req.body
    const lostEvents: Array<Lost_Event> = (await pool.query('SELECT * FROM LostEvents WHERE target_service = $1', [service_name])).rows
    const {host, port} = (await pool.query('SELECT host,port FROM Services WHERE service_name = $1', [service_name])).rows[0]
    lostEvents.forEach(e => {
        const event: Event = {service_name: e.emitter_service, payload : e.payload, event_type : e.event_type}
        axios.post(`http://${host}:${port}/event`, event).then(
            () => {
                RemoveLostServiceFromDatabase(e.lost_event_id)
            }
        ).catch(e => console.log(e))
    })
    res.end()
})



app.listen(PORT, () => console.log(`Barramento. Porta: ${PORT}.`))
