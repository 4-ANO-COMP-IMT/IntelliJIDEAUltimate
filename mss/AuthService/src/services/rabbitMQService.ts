import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from '../config/env';

const rabbitMQUrl = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

// Nome da exchange fanout

// Função para publicar na exchange fanout
export const publishToFanoutExchange = async (exchangeName: string, data: any) => {
  console.log('Publishing to fanout exchange');
  console.log('data:', data);
  console.log('rabbitMQUrl:', rabbitMQUrl);
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  // Declarando a exchange do tipo 'fanout'
  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  // Publicando a mensagem na exchange
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
  console.log('Mensagem publicada na exchange fanout');

  setTimeout(() => {
    connection.close();
  }, 500);
};

// Função para consumir mensagens de uma fila associada à exchange fanout
export const consumeFromQueue = async (exchangeName: string,queueName: string) => {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  // Declarando a exchange do tipo 'fanout'
  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  // Declarando a fila e associando-a à exchange
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, '');
  // Consumindo mensagens da fila
  channel.consume(queueName, (message) => {
    if (message) {
      console.log('Mensagem recebida da fila:', queueName);
      console.log(message.content.toString());
      channel.ack(message);  // Confirma a mensagem como processada
    }
  }, {
    noAck: false  // Para garantir que as mensagens sejam confirmadas manualmente após o processamento
  });

  console.log(`Esperando mensagens na fila '${queueName}' associada à exchange '${exchangeName}'...`);
};
