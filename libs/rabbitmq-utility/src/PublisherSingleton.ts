import amqp from 'amqplib';
import { createChannel, getGlobalConnection } from './rabbitmq';

export abstract class PublisherSingleton<TMessage> {
    // Mapa para armazenar as instâncias de cada classe
    private static instances: Map<string, PublisherSingleton<any>> = new Map();
    private _channel: amqp.Channel | null = null;
    private _exchange: string;

    public get channel(): amqp.Channel | null {
        return this._channel;
    }

    public get exchange(): string {
        return this._exchange;
    }

    // Construtor protegido para inicializar o exchange
    protected constructor(topic: string) {
        this._exchange = `${topic}-exchange`;
    }

    // Método estático para obter a instância singleton da classe, criando-a se necessário
    public static async getInstance<T extends PublisherSingleton<any>>(this: new () => T): Promise<T> {
        const className = this.name;

        if (!PublisherSingleton.instances.has(className)) {
            const instance = new this();
            PublisherSingleton.instances.set(className, instance);

            instance._channel = await createChannel(getGlobalConnection());
            await instance.setupExchange();

            return instance;
        }

        return PublisherSingleton.instances.get(className) as T;
    }


    // Método privado para configurar o exchange no RabbitMQ
    private async setupExchange(): Promise<void> {
        if (!this._channel) {
            throw new Error('Channel is not initialized.');
        }
        await this._channel.assertExchange(this._exchange, 'fanout', { durable: true });
        console.log(`Exchange ${this._exchange} asserted successfully.`);
    }

    // Método para publicar uma mensagem no exchange
    public async publish(message: TMessage): Promise<void> {
        if (!this._channel) {
            throw new Error('Channel is not initialized.');
        }
        this._channel.publish(this._exchange, '', Buffer.from(JSON.stringify(message)));
        console.log(`Message published to exchange ${this._exchange}:`, message);
    }
}
