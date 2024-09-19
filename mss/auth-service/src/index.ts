import express from 'express';
import routes from './routes';
import { PORT } from './config/env';
// import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

import {ConsumerSingleton, connectToRabbitMQ } from '@intelij-ultimate/rabbitmq-utility';

import {LoginPublisherSingleton, LogoutPublisherSingleton} from "@intelij-ultimate/session-utility";
import { RegistrationConsumer } from '@intelij-ultimate/user-utility';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use((req, res) => {console.log("retornando ao client")});

// app.use(errorHandler);

async function startServer() {
    console.log('wait 3 seconds before starting up ...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('starting up');

    let connection = await connectToRabbitMQ();

    await LoginPublisherSingleton.getInstance();
    await LogoutPublisherSingleton.getInstance(); 

    await RegistrationConsumer.createInstance("auth-service");

    await ConsumerSingleton.startAllConsumers();


    app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
}

startServer();
