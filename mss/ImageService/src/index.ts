import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { PORT } from './config/env';
import { setupMulter } from './config/multer';
// import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import path from 'path';

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

  res.status(200).json({ message: 'Uploads realizados com sucesso!' });
}

// Configuração do multer
const upload = setupMulter();

// Rota para upload de múltiplos arquivos
app.post('/upload', upload.array('images', 10), handleFileUpload);


// Endpoint para download de arquivos
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'upload', filename);

  // Use res.download para enviar o arquivo e forçar o download
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Erro ao fazer o download do arquivo:', err);
      res.status(404).send('Arquivo não encontrado');
    }
  });
});

//todo: fazer quando uma imagem chegar no servidor mandar o id dela pelo barramento, criar um novo servico que é o resposavel por reservar a imagem para um usuario, esse microsservico irá ouvir as imagens que chegam e vai colocar no banco de dados, junto com as informações de alocação, e sempre que um usuario for reservar uma imagem ele irá requisitar para o servico que ira ver uma imagem não reservada e reservar ela para o cliente, e retornar o id da imagem para o cliente

app.get('/view/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'upload', filename);

  // Use res.sendFile para enviar o arquivo e permitir que o navegador exiba a imagem
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao mostrar o arquivo:', err);
      res.status(404).send('Arquivo não encontrado');
    }
  });
});



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