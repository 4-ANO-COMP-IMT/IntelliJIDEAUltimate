import * as amqp from 'amqplib';
import { globalConnection, createChannel } from '@intelij-ultimate/rabbitmq-utility';
import { User } from './interfaces';


export class ResgistrationPublisherSingleton {
    private static instance: ResgistrationPublisherSingleton;
    private exchange: string = "on_registration-exchange";
    private channel!: amqp.Channel;

    private constructor() {}

    public static getInstance(): ResgistrationPublisherSingleton {
        if (!ResgistrationPublisherSingleton.instance) {
            ResgistrationPublisherSingleton.instance = new ResgistrationPublisherSingleton();
        }
        return ResgistrationPublisherSingleton.instance;
    }

    async start() {
        this.channel = await createChannel(globalConnection);
        await this.channel.assertExchange(this.exchange, 'fanout', { durable: true });
    }

    async publish(user: User): Promise<void> {
        const channel = this.channel;
        channel.publish(this.exchange, '', Buffer.from(JSON.stringify(user)));
    }
}
