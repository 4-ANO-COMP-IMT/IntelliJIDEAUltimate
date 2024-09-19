// RabbitMQConsumer.ts

import amqp from 'amqplib';
import { GlobalRabbitMQService } from './GlobalRabbitMQService';

/**
 * RabbitMQConsumer is an abstract class that manages the setup and consumption of messages from RabbitMQ.
 * Ensures that only one instance of each concrete consumer class is created and used.
 * 
 * @template TData - The type of message the consumer will process.
 */
export abstract class RabbitMQConsumer<TData> {
    private queueName: string;
    private exchangeName: string;
    private channel: amqp.Channel | null = null;

    // Stores singleton instances of consumers, with more specific typing than using `any`
    private static instances: Map<string, RabbitMQConsumer<unknown>> = new Map();

    /**
     * Returns the AMQP channel associated with this consumer.
     * @returns {amqp.Channel | null} The current AMQP channel or null if not initialized.
     */
    public getChannel(): amqp.Channel | null {
        return this.channel;
    }

    /**
     * Returns the RabbitMQ queue name for this consumer.
     * @returns {string} The queue name.
     */
    public getQueueName(): string {
        return this.queueName;
    }

    /**
     * Returns the RabbitMQ exchange name for this consumer.
     * @returns {string} The exchange name.
     */
    public getExchangeName(): string {
        return this.exchangeName;
    }

    /**
     * Starts all consumers, consuming from their respective queues.
     * This method should be called to initialize the consumption after all instances are created.
     * @returns {Promise<void>} Resolves when all consumers have started.
     * @throws {Error} If any consumer does not have an initialized channel.
     * 
     * @example
     * await RabbitMQConsumer.startAllConsumers();
     */
    public static async startAllConsumers(): Promise<void> {
        const consumers = Array.from(RabbitMQConsumer.instances.values());
        await Promise.all(consumers.map(async (consumer) => {
            if (!consumer.channel) {
                throw new Error('Channel is not initialized.');
            }
            await consumer.channel.consume(consumer.queueName, consumer.handleMessage.bind(consumer));
            console.log(`Started consuming from ${consumer.queueName}`);
        }));
        console.log('All consumers started');
    }

    /**
     * Protected constructor that sets up the queue and exchange for the consumer.
     * Use the static `createInstance` method to instantiate.
     * 
     * @param {string} serviceName - The service name to prefix the queue.
     * @param {string} topic - The topic for the exchange.
     */
    protected constructor(serviceName: string, topic: string) {
        this.queueName = `${serviceName}-${topic}-queue`;
        this.exchangeName = `${topic}-exchange`;
    }

    /**
     * Retrieves the singleton instance of the given consumer class.
     * 
     * @template T - The type of the consumer class.
     * @returns {T} The singleton instance.
     * @throws {Error} If the instance does not exist.
     * 
     * @example
     * const instance = MyConsumer.getInstance();
     */
    public static getInstance<T extends RabbitMQConsumer<unknown>>(this: new () => T): T {
        const className = this.name;
        const instance = RabbitMQConsumer.instances.get(className);
        if (!instance) {
            throw new Error(`Instance of ${className} does not exist`);
        }
        return instance as T;
    }

    /**
     * Creates a singleton instance of the given consumer class and sets up its RabbitMQ channel and bindings.
     * 
     * @template T - The type of the consumer class.
     * @param {string} serviceName - The service name used to prefix the queue.
     * @returns {Promise<T>} The created singleton instance.
     * @throws {Error} If an instance of the consumer already exists.
     * 
     * @example
     * const instance = await MyConsumer.createInstance('myService');
     */
    public static async createInstance<T extends RabbitMQConsumer<unknown>>(this: new (serviceName: string) => T, serviceName: string): Promise<T> {
        const className = this.name;
        if (RabbitMQConsumer.instances.has(className)) {
            throw new Error(`Instance of ${className} already exists`);
        }

        const instance = new this(serviceName);
        RabbitMQConsumer.instances.set(className, instance);

        // Uses GlobalRabbitMQService to create the channel
        instance.channel = await GlobalRabbitMQService.createChannel();
        await instance.setupQueueAndExchange();

        return instance;
    }

    /**
     * Sets up the queue and exchange in RabbitMQ for the consumer.
     * Ensures the queue is bound to the exchange.
     * @returns {Promise<void>} Resolves when the setup is complete.
     * @throws {Error} If the channel is not initialized.
     */
    private async setupQueueAndExchange(): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized.');
        }
        await this.channel.assertQueue(this.queueName, { durable: true });
        await this.channel.assertExchange(this.exchangeName, 'fanout', { durable: true });
        await this.channel.bindQueue(this.queueName, this.exchangeName, '');
        console.log(`Queue ${this.queueName} and Exchange ${this.exchangeName} setup successfully`);
    }

    /**
     * Handles incoming messages from the RabbitMQ queue.
     * Parses the message content and passes it to `processMessage`.
     * Acknowledges the message if processed successfully, otherwise rejects it.
     * 
     * @param {amqp.Message | null} msg - The received message.
     * @returns {Promise<void>}
     */
    private async handleMessage(msg: amqp.Message | null): Promise<void> {
        if (!msg || !this.channel) return;

        try {
            const messageContent = msg.content.toString();
            const parsedMessage = this.parseMessageContent(messageContent);
            console.log(`Received message on ${this.queueName}:`, parsedMessage);

            const success = await this.processMessage(parsedMessage);
            if (success) {
                this.channel.ack(msg);
                console.log('Message acknowledged');
            } else {
                this.channel.nack(msg);
                console.log('Message not acknowledged');
            }
        } catch (error) {
            console.error('Error processing message:', error);
            if (this.channel) {
                this.channel.nack(msg, false, false); // Reject the message without requeueing
            }
        }
    }

    /**
     * Abstract method to be implemented by subclasses to process messages.
     * 
     * @param {TData} data - The parsed message data.
     * @returns {Promise<boolean>} Resolves with true if the message was processed successfully.
     */
    protected abstract processMessage(data: TData): Promise<boolean>;

    /**
     * Parses the raw message content. This method can be overridden by subclasses.
     * By default, parses the message as JSON.
     * 
     * @param {string} content - The raw message content.
     * @returns {TData} The parsed message.
     * @example
     * const parsed = this.parseMessageContent('{"key": "value"}');
     */
    protected parseMessageContent(content: string): TData {
        return JSON.parse(content);
    }
}
