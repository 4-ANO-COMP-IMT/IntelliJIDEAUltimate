import express from 'express';
import routes from './routes';
import { PORT } from './config/env';
import cors from 'cors';
import {Consumer,connectToRabbitMQ,startConsuming, } from '@intelij-ultimate/rabbitmq-utility';
import { LoginConsumer } from '@intelij-ultimate/session-utility';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use((req, res) => {console.log("retornando ao client")});

async function startServer() {

    console.log('Starting up... wait 3 seconds');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('stop waiting');


    let connection = await connectToRabbitMQ();

    let consumers: Consumer[] = [
        LoginConsumer.getInstance()
    ];
    startConsuming(connection, consumers);


    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}

startServer();