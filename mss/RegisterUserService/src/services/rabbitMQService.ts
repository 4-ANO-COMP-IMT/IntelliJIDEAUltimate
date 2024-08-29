import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from '../config/env';

const rabbitMQUrl = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

export const publishToExchange = async (exchangeName: string, data: any, exchangeType = 'fanout') => {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, exchangeType, { durable: false });
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
  setTimeout(() => connection.close(), 500);
};
