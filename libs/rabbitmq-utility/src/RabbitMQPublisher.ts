// RabbitMQPublisher.ts

import amqp from 'amqplib';
import { GlobalRabbitMQService } from './GlobalRabbitMQService';

/**
 * RabbitMQPublisher is an abstract class that manages message publishing to a RabbitMQ exchange.
 * It uses the singleton pattern to ensure only one instance of each concrete publisher class exists.
 * 
 * @template TData - The type of message to be published.
 */
export abstract class RabbitMQPublisher<TData> {
    // Map to store singleton instances of each class
    private static instances: Map<string, RabbitMQPublisher<unknown>> = new Map();
    private channel: amqp.Channel | null = null;
    private exchangeName: string;

    /**
     * Returns the AMQP channel associated with this publisher.
     * @returns {amqp.Channel | null} The current AMQP channel or null if not initialized.
     */
    public getChannel(): amqp.Channel | null {
        return this.channel;
    }

    /**
     * Returns the RabbitMQ exchange name for this publisher.
     * @returns {string} The exchange name.
     */
    public getExchangeName(): string {
        return this.exchangeName;
    }

    /**
     * Protected constructor to initialize the exchange name for the publisher.
     * 
     * @param {string} topic - The topic for the exchange.
     */
    protected constructor(topic: string) {
        this.exchangeName = `${topic}-exchange`;
    }

    /**
     * Retrieves the singleton instance of the given publisher class, creating it if necessary.
     * 
     * @template T - The type of the publisher class.
     * @returns {Promise<T>} The singleton instance.
     * @throws {Error} If the channel initialization fails.
     * 
     * @example
     * const instance = await MyPublisher.getInstance();
     */
    public static async getInstance<T extends RabbitMQPublisher<unknown>>(this: new () => T): Promise<T> {
        const className = this.name;

        if (!RabbitMQPublisher.instances.has(className)) {
            const instance = new this();
            RabbitMQPublisher.instances.set(className, instance);

            // Uses GlobalRabbitMQService to create the channel
            instance.channel = await GlobalRabbitMQService.createChannel();
            await instance.setupExchange();

            return instance;
        }

        return RabbitMQPublisher.instances.get(className) as T;
    }

    /**
     * Private method to set up the exchange in RabbitMQ.
     * Ensures the exchange is declared in RabbitMQ.
     * 
     * @returns {Promise<void>} Resolves when the exchange setup is complete.
     * @throws {Error} If the channel is not initialized.
     */
    private async setupExchange(): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized.');
        }
        await this.channel.assertExchange(this.exchangeName, 'fanout', { durable: true });
        console.log(`Exchange ${this.exchangeName} asserted successfully.`);
    }

    /**
     * Publishes a message to the RabbitMQ exchange.
     * 
     * @param {TData} message - The message to be published.
     * @returns {Promise<void>} Resolves when the message is published.
     * @throws {Error} If the channel is not initialized.
     * 
     * @example
     * await publisher.publish({ key: 'value' });
     */
    public async publish(message: TData): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized.');
        }
        this.channel.publish(this.exchangeName, '', Buffer.from(JSON.stringify(message)));
        console.log(`Message published to exchange ${this.exchangeName}:`, message);
    }
}
