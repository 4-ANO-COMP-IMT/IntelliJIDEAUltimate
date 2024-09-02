import { pool } from "@intelij-ultimate/postgres-utility";
import { Consumer } from "@intelij-ultimate/rabbitmq-utility";
import amqp from 'amqplib';
import { User } from "./interfaces";

export class RegistrationConsumer implements Consumer {
    private static instance: RegistrationConsumer | null = null;

    private constructor() {}

    static getInstance(): RegistrationConsumer {
        if (!RegistrationConsumer.instance) {
            RegistrationConsumer.instance = new RegistrationConsumer();
        }
        return RegistrationConsumer.instance;
    }

    queue: string = "auth_service-on_registration-queue";
    exchange: string = "on_registration-exchange";
    query = `INSERT INTO users (user_id, username, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *`;

    async consumeFunction(msg: amqp.Message | null, channel: amqp.Channel) {
        let user: User = JSON.parse(msg!.content.toString());    
        console.log('Received user:', user);
        await pool.query(this.query, [user.user_id, user.username, user.password, user.is_admin]);
        channel.ack(msg!); 
    }
}
