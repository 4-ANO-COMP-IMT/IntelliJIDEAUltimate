import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from './config/env';

export const DEFAULT_RABBITMQ_URL = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

export interface RabbitMQConfig {
    host: string;
    port: string;
    user: string;
    password: string;
}

/**
 * RabbitMQConnectionManager manages connections and channels to RabbitMQ.
 * It provides factory methods to create instances and handles automatic reconnection in case of errors.
 */
export class RabbitMQConnectionManager {
    private rabbitmqUrl: string;
    private connection: amqp.Connection | null = null;

    /**
     * Private constructor to initialize the connection manager with the given URL.
     * Use factory methods to create instances.
     * @param {string} [url] - The RabbitMQ connection URL. Defaults to the environment-based URL.
     */
    constructor(url?: string) {
        this.rabbitmqUrl = url || DEFAULT_RABBITMQ_URL;
    }

    /**
     * Factory method to create an instance using a RabbitMQ URL.
     * @param {string} url - RabbitMQ connection URL.
     * @returns {RabbitMQConnectionManager} An instance of RabbitMQConnectionManager.
     * @example
     * const manager = RabbitMQConnectionManager.fromUrl('amqp://user:pass@localhost:5672');
     */
    public static fromUrl(url: string): RabbitMQConnectionManager {
        return new RabbitMQConnectionManager(url);
    }

    /**
     * Factory method to create an instance using a configuration object.
     * @param {RabbitMQConfig} config - The RabbitMQ connection configuration.
     * @returns {RabbitMQConnectionManager} An instance of RabbitMQConnectionManager.
     * @example
     * const manager = RabbitMQConnectionManager.fromConfig({
     *   host: 'localhost',
     *   port: '5672',
     *   user: 'guest',
     *   password: 'guest'
     * });
     */
    public static fromConfig(config: RabbitMQConfig): RabbitMQConnectionManager {
        const url = `amqp://${config.user}:${config.password}@${config.host}:${config.port}`;
        return new RabbitMQConnectionManager(url);
    }

    /**
     * Sets the RabbitMQ URL manually.
     * @param {string} url - The RabbitMQ connection URL.
     * @example
     * manager.setRabbitMQUrl('amqp://user:pass@localhost:5672');
     */
    public setRabbitMQUrl(url: string): void {
        this.rabbitmqUrl = url;
    }

    /**
     * Gets the current RabbitMQ connection URL.
     * @returns {string} The RabbitMQ connection URL.
     * @example
     * const url = manager.getRabbitMQUrl();
     */
    public getRabbitMQUrl(): string {
        return this.rabbitmqUrl;
    }

    /**
     * Retrieves the global connection if initialized.
     * Throws an error if the connection is not established.
     * @returns {amqp.Connection} The global RabbitMQ connection.
     * @throws {Error} If the connection is not initialized.
     * @example
     * const connection = manager.getGlobalConnection();
     */
    public getGlobalConnection(): amqp.Connection {
        if (!this.connection) {
            throw new Error('RabbitMQ global connection is not initialized.');
        }
        return this.connection;
    }

    /**
     * Connects to RabbitMQ and returns the connection.
     * Reuses the connection if already established.
     * @returns {Promise<amqp.Connection>} The RabbitMQ connection.
     * @throws {Error} If the connection fails.
     * @example
     * const connection = await manager.connectToRabbitMQ();
     */
    public async connectToRabbitMQ(): Promise<amqp.Connection> {
        if (this.connection) {
            console.warn('Reusing existing RabbitMQ connection');
            return this.connection;
        }

        try {
            const connection = await amqp.connect(this.getRabbitMQUrl());
            this.connection = connection;

            connection.on('error', (err: Error) => {
                console.error('RabbitMQ connection error:', err);
                this.connection = null;
            });

            connection.on('close', () => {
                console.warn('RabbitMQ connection closed.');
                this.connection = null;
            });

            return connection;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Failed to connect to RabbitMQ:', error);
                throw new Error(`Could not connect to RabbitMQ. Error: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while connecting to RabbitMQ');
            }
        }
    }

    /**
     * Creates a new channel using the existing connection.
     * If the connection is not established, it will attempt to connect first.
     * @returns {Promise<amqp.Channel>} The newly created channel.
     * @throws {Error} If channel creation fails.
     * @example
     * const channel = await manager.createNewChannel();
     */
    public async createNewChannel(): Promise<amqp.Channel> {
        if (!this.connection) {
            await this.connectToRabbitMQ();
        }

        try {
            const channel = await this.connection!.createChannel();
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

    /**
     * Closes the global connection, if it exists.
     * @returns {Promise<void>} Resolves once the connection is closed.
     * @example
     * await manager.closeConnection();
     */
    public async closeConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
