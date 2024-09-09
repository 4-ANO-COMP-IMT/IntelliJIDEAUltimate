import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { PORT } from '../config/env';
import { setupMulter } from '../config/multer';
// import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

import {Consumer,connectToRabbitMQ,startConsuming, } from '@intelij-ultimate/rabbitmq-utility';

import {LoginPublisherSingleton, LogoutPublisherSingleton} from "@intelij-ultimate/session-utility";
import { RegistrationConsumer } from '@intelij-ultimate/user-utility';

// Configuração do express
const app = express();
app.use(express.json()); // Para processar o corpo JSON das requisições


// Função para lidar com o upload de arquivos
function handleFileUpload(req: Request, res: Response): void {
  const { username } = req.body; // Obtém o nome do usuário do corpo da requisição
  console.log(req);
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    return;
  }

  // Converte req.files para o tipo correto
  const files = req.files as Express.Multer.File[];

  // Aqui, você deve salvar os detalhes do arquivo e do usuário no banco de dados
  // Exemplo:
  files.forEach(file => {
    //username, file.filename, new Date()
    console.log(`Arquivo ${file.filename} enviado por ${username}`);
  });

  let filenames = files.map(file => file.filename);
  res.status(200).json({ message: 'Uploads realizados com sucesso!' , filenames});
}

// Configuração do multer
const upload = setupMulter();

// Rota para upload de múltiplos arquivos
app.post('/upload', upload.array('images', 10), handleFileUpload);


async function startServer() {
    console.log('Starting up... wait 10 seconds');
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log('stop waiting');

    let connection = await connectToRabbitMQ();
    // await LoginPublisherSingleton.getInstance().start();
    // await LogoutPublisherSingleton.getInstance().start();

    let consumers: Consumer[] = [
        // RegistrationConsumer.getInstance()
    ];
    startConsuming(connection, consumers);


    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}

startServer();