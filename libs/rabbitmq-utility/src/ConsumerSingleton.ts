import amqp from 'amqplib';
import { createChannel, getGlobalConnection } from './rabbitmq';

export abstract class ConsumerSingleton<TMessage> {
    private _queue: string;
    private _exchange: string;
    private _channel: amqp.Channel | null = null;


    public get channel(): amqp.Channel | null {
        return this._channel;
    }

    public get queue(): string {
        return this._queue;
    }

    public get exchange(): string {
        return this._exchange;
    }


    // Armazena instâncias singleton
    private static instances: Map<string, ConsumerSingleton<any>> = new Map();

    // Método estático para inicializar o consumo de todas as instâncias criadas
    public static async startAllConsumers(): Promise<void> {
        const consumers = Array.from(ConsumerSingleton.instances.values());
        await Promise.all(consumers.map(async (consumer) => {
            if (!consumer._channel) {
                throw new Error('Channel is not initialized.');
            }
            await consumer._channel.consume(consumer._queue, consumer.handleMessage.bind(consumer));
            console.log(`Started consuming from ${consumer._queue}`);
        }));
        console.log('All consumers started');
    }

    // Construtor protegido que configura a fila e a exchange
    protected constructor(serviceName: string, topic: string) {
        this._queue = `${serviceName}-${topic}-queue`;
        this._exchange = `${topic}-exchange`;
    }

    // Método estático para obter a instância de uma classe concreta
    public static getInstance<T extends ConsumerSingleton<any>>(this: new () => T): T {
        const className = this.name;
        const instance = ConsumerSingleton.instances.get(className);
        if (!instance) {
            throw new Error(`Instance of ${className} does not exist`);
        }
        return instance as T;
    }

    // Cria uma nova instância e configura o canal AMQP
    public static async createInstance<T extends ConsumerSingleton<any>>(this: new (serviceName: string) => T, serviceName: string): Promise<T> {
        const className = this.name;
        if (ConsumerSingleton.instances.has(className)) {
            throw new Error(`Instance of ${className} already exists`);
        }

        const instance = new this(serviceName);
        ConsumerSingleton.instances.set(className, instance);

        instance._channel = await createChannel(getGlobalConnection());
        await instance.setupQueueAndExchange();

        return instance;
    }

    // Configura a fila e a exchange no RabbitMQ
    private async setupQueueAndExchange(): Promise<void> {
        if (!this._channel) {
            throw new Error('Channel is not initialized.');
        }
        await this._channel.assertQueue(this._queue, { durable: true });
        await this._channel.assertExchange(this._exchange, 'fanout', { durable: true });
        await this._channel.bindQueue(this._queue, this._exchange, '');
        console.log(`Queue ${this._queue} and Exchange ${this._exchange} setup successfully`);
    }

    // Método para tratar a mensagem recebida
    private async handleMessage(msg: amqp.Message | null): Promise<void> {
        if (!msg || !this._channel) return;

        try {
            const messageContent = msg.content.toString();
            const parsedMessage = this.parseMessageContent(messageContent);
            console.log(`Received message on ${this._queue}:`, parsedMessage);

            const success = await this.processMessage(parsedMessage);
            if (success) {
                this._channel.ack(msg);
                console.log('Message acknowledged');
            } else {
                this._channel.nack(msg);
                console.log('Message not acknowledged');
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    // Método que será implementado pelas subclasses para lidar com as mensagens recebidas
    protected abstract processMessage(data: TMessage): Promise<boolean>;

    // Método de parsing padrão, pode ser sobrescrito
    protected parseMessageContent(content: string): TMessage {
        return JSON.parse(content);
    }
}
