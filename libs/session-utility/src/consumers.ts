import { pool } from "@intelij-ultimate/postgres-utility";
import { Consumer } from "@intelij-ultimate/rabbitmq-utility";
import amqp from 'amqplib';
import { Session } from "./interfaces";

export class LoginConsumer implements Consumer {
    private static instance: LoginConsumer | null = null;

    private constructor() {}

    static getInstance(): LoginConsumer {
        if (!LoginConsumer.instance) {
            LoginConsumer.instance = new LoginConsumer();
        }
        return LoginConsumer.instance;
    }

    queue: string = "register_user_service-on_login-queue";
    exchange: string = "on_login-exchange";
    query = `INSERT INTO sessions (session_id, user_id, session_token, session_expiry) VALUES ($1, $2, $3, $4)`;

    async consumeFunction(msg: amqp.Message | null, channel: amqp.Channel) {
        let session: Session = JSON.parse(msg!.content.toString());    
        console.log('Received session:', session);
        await pool.query(this.query, [session.session_id, session.user_id, session.session_token, session.session_expiry]);
        channel.ack(msg!); 
    }
}

export class LogoutConsumer implements Consumer {
    private static instance: LogoutConsumer | null = null;

    private constructor() {}

    static getInstance(): LogoutConsumer {
        if (!LogoutConsumer.instance) {
            LogoutConsumer.instance = new LogoutConsumer();
        }
        return LogoutConsumer.instance;
    }

    queue: string = "register_user_service-on_logout-queue";
    exchange: string = "on_logout-exchange";
    query = `DELETE FROM sessions WHERE session_token = $1`;

    async consumeFunction(msg: amqp.Message | null, channel: amqp.Channel) {
        let session: Session = JSON.parse(msg!.content.toString());    
        console.log('Received session_token:', session);
        await pool.query(this.query, [session.session_token]);
        channel.ack(msg!); 
    }
}
