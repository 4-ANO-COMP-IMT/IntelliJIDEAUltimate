import amqp from 'amqplib';
import { RabbitMQConnectionManager } from './RabbitMQConnectionManager';

/**
 * GlobalRabbitMQService provides a globally accessible and static interface for managing RabbitMQ connections and channels.
 * It wraps RabbitMQConnectionManager and simplifies access to a global RabbitMQ connection.
 */
export class GlobalRabbitMQService {
    private static connectionManager: RabbitMQConnectionManager | null = null;

    /**
     * Initializes the global RabbitMQ connection using the provided URL or the default.
     * @param {string} [url] - The RabbitMQ connection URL.
     * @example
     * GlobalRabbitMQService.initialize('amqp://user:pass@localhost:5672');
     */
    public static initialize(url?: string): void {
        if (!GlobalRabbitMQService.connectionManager) {
            GlobalRabbitMQService.connectionManager = new RabbitMQConnectionManager(url);
        }else{
            console.error("connectionManager already initialized");
        }
    }

    /**
     * Initializes the global RabbitMQ connection using a configuration object.
     * @param {object} config - RabbitMQ configuration.
     * @param {string} config.host - The RabbitMQ host.
     * @param {string} config.port - The RabbitMQ port.
     * @param {string} config.user - The RabbitMQ user.
     * @param {string} config.password - The RabbitMQ password.
     * @example
     * GlobalRabbitMQService.initializeWithConfig({
     *   host: 'localhost',
     *   port: '5672',
     *   user: 'guest',
     *   password: 'guest'
     * });
     */
    public static initializeWithConfig(config: {
        host: string;
        port: string;
        user: string;
        password: string;
    }): void {
        const url = `amqp://${config.user}:${config.password}@${config.host}:${config.port}`;
        GlobalRabbitMQService.initialize(url);
    }

    /**
     * Returns the global RabbitMQ connection, connecting if necessary.
     * @returns {Promise<amqp.Connection>} The RabbitMQ connection.
     * @throws {Error} If GlobalRabbitMQService is not initialized.
     * @example
     * const connection = await GlobalRabbitMQService.getConnection();
     */
    public static async getConnection(): Promise<amqp.Connection> {
        if (!GlobalRabbitMQService.connectionManager) {
            throw new Error('RabbitMQService is not initialized. Call initialize() first.');
        }
        return await GlobalRabbitMQService.connectionManager.connectToRabbitMQ();
    }

    /**
     * Creates a new channel using the global RabbitMQ connection.
     * @returns {Promise<amqp.Channel>} The newly created channel.
     * @throws {Error} If GlobalRabbitMQService is not initialized.
     * @example
     * const channel = await GlobalRabbitMQService.createChannel();
     */
    public static async createChannel(): Promise<amqp.Channel> {
        if (!GlobalRabbitMQService.connectionManager) {
            throw new Error('RabbitMQService is not initialized. Call initialize() first.');
        }
        return GlobalRabbitMQService.connectionManager.createNewChannel();
    }

    /**
     * Closes the global RabbitMQ connection.
     * @returns {Promise<void>} Resolves once the connection is closed.
     * @example
     * await GlobalRabbitMQService.closeConnection();
     */
    public static async closeConnection(): Promise<void> {
        if (GlobalRabbitMQService.connectionManager) {
            await GlobalRabbitMQService.connectionManager.closeConnection();
        }
    }
}
