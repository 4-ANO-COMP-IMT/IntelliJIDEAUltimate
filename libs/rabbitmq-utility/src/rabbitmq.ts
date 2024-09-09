import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from './config/env';

export const rabbitMQUrl = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
let globalConnection: amqp.Connection | null = null;


export function getGlobalConnection(): amqp.Connection {
    if (!globalConnection) {
        throw new Error('RabbitMQ global connection is not initialized.');
    }
    return globalConnection;
}

// Conecta ao RabbitMQ e retorna a conexão
export async function connectToRabbitMQ(): Promise<amqp.Connection> {
    if (globalConnection) {
        console.log('Reusing existing RabbitMQ connection');
        return globalConnection;
    }

    try {
        const connection = await amqp.connect(rabbitMQUrl);
        console.log(`Connected to RabbitMQ at ${rabbitMQUrl}`);
        globalConnection = connection;

        // Adiciona listener para detectar fechamentos inesperados da conexão
        globalConnection.on('error', (err: Error) => {
            console.error('RabbitMQ connection error:', err);
            globalConnection = null; // Reseta a conexão global
        });

        globalConnection.on('close', () => {
            console.warn('RabbitMQ connection closed.');
            globalConnection = null;
        });

        return connection;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to connect to RabbitMQ:', error);
            throw new Error(`Could not connect to RabbitMQ using URL: ${rabbitMQUrl}. Error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while connecting to RabbitMQ');
        }
    }
}

// Cria um canal a partir da conexão fornecida
export async function createChannel(connection: amqp.Connection): Promise<amqp.Channel> {
    try {
        const channel = await connection.createChannel();
        console.log('Channel created successfully');
        return channel;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to create RabbitMQ channel:', error);
            throw new Error(`Could not create RabbitMQ channel. Error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while creating RabbitMQ channel');
        }
    }
}
