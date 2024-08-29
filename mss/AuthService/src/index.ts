import express from 'express';
import routes from './routes';
import { PORT } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use((req, res) => {console.log("retornando ao client")});

app.use(errorHandler);

async function startServer() {
    //test if postgres is running
    //test if rabbitmq is running
    //test if redis is running

    //trow error if any of the services is not running
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}

startServer();
