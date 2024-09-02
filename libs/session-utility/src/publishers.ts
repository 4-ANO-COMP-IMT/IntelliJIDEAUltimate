import * as amqp from 'amqplib';
import { globalConnection, createChannel } from '@intelij-ultimate/rabbitmq-utility';
import { Session } from './interfaces';


export class LoginPublisherSingleton {
    private static instance: LoginPublisherSingleton;
    private exchange: string = "on_login-exchange";
    private channel!: amqp.Channel;

    private constructor() {}

    public static getInstance(): LoginPublisherSingleton {
        if (!LoginPublisherSingleton.instance) {
            LoginPublisherSingleton.instance = new LoginPublisherSingleton();
        }
        return LoginPublisherSingleton.instance;
    }

    async start() {
        this.channel = await createChannel(globalConnection);
        await this.channel.assertExchange(this.exchange, 'fanout', { durable: true });
    }

    async publish(session: Session): Promise<void> {
        const channel = this.channel;
        channel.publish(this.exchange, '', Buffer.from(JSON.stringify(session)));
    }
}

export class LogoutPublisherSingleton {
    private static instance: LogoutPublisherSingleton;
    private exchange: string = "on_logout-exchange";
    private channel!: amqp.Channel;

    private constructor() {}

    public static getInstance(): LogoutPublisherSingleton {
        if (!LogoutPublisherSingleton.instance) {
            LogoutPublisherSingleton.instance = new LogoutPublisherSingleton();
        }
        return LogoutPublisherSingleton.instance;
    }

    async start() {
        this.channel = await createChannel(globalConnection);
        await this.channel.assertExchange(this.exchange, 'fanout', { durable: true });
    }

    async publish(session: Session): Promise<void> {
        const channel = this.channel;
        channel.publish(this.exchange, '', Buffer.from(JSON.stringify(session)));
    }
}
