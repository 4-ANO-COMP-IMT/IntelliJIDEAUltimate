import express from 'express';
import routes from './routes';
import { PORT } from './config/env';
// import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import { authMiddleware } from '@intelij-ultimate/middleware-utility';

const app = express();

app.use(express.json());
app.use(cors());
app.use(authMiddleware);
app.use('/api', routes);
app.use((req, res) => {console.log("retornando ao client")});

// app.use(errorHandler);

async function startServer() {
    console.log('Starting up... wait 10 seconds');
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('stop waiting');


    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}

startServer();
