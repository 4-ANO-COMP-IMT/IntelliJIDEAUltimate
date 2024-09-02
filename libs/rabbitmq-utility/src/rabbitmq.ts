import amqp from 'amqplib';
import { Consumer } from './consumer';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from './config/env';

export const rabbitMQUrl = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
export let globalConnection: amqp.Connection;

export async function connectToRabbitMQ(): Promise<amqp.Connection> {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        console.log('Connected to RabbitMQ');
        console.log('rabbitMQUrl:', rabbitMQUrl);
        globalConnection = connection;
        return connection;
    } catch (error) {
        throw new Error('Could not connect to RabbitMQ using URL: ' + rabbitMQUrl);
    }
}

export async function createChannel(connection: amqp.Connection): Promise<amqp.Channel> {
    const channel = await connection.createChannel();
    console.log('Channel created');
    return channel;
}

export function startConsuming(connection: amqp.Connection, consumers: Consumer[]): void {
    consumers.forEach(async (consumer) => {
        const channel = await createChannel(connection);
        await channel.assertQueue(consumer.queue);
        await channel.assertExchange(consumer.exchange, 'fanout', { durable: true });
        await channel.bindQueue(consumer.queue, consumer.exchange, '');

        function callback(msg: amqp.ConsumeMessage | null): void {
            consumer.consumeFunction(msg, channel);
            console.log('Message consumed from queue:', consumer.queue);
            console.log('Message:', msg?.content.toString());
        }

        await channel.consume(consumer.queue, callback);
        console.log(`Started consuming from ${consumer.queue}`);
    });

    console.log('All consuming started');
}
