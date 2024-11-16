import { pool } from "@intelij-ultimate/postgres-utility";
import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import amqp from 'amqplib';
import { User } from "./interfaces";
import { on_registration_topic } from "./topics";

const query = `INSERT INTO users (user_id, username, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *`


export class RegistrationConsumer extends ConsumerSingleton<User> {
    protected async processMessage(data: User): Promise<boolean> {
        try{
            const result = await pool.query(query, [data.user_id, data.username, data.password, data.is_admin]);
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_registration_topic);
    }
}
