import { pool } from "@intelij-ultimate/postgres-utility";
import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import amqp from 'amqplib';
import { Image } from "./interfaces";
import { on_image_topic } from "./topics";

export const query = `INSERT INTO images (id, filename, filetype, image_token) VALUES ($1, $2, $3, $4) RETURNING *`;
export class ImageConsumer extends ConsumerSingleton<Image> {
    protected async processMessage(data: Image): Promise<boolean> {
        try{
            const result = await pool.query(query, [data.id, data.filename, data.filetype, data.image_token]);
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_image_topic);
    }
}



/*



export class LoginConsumerSingleton extends ConsumerSingleton<Session> {
    protected async processMessage(data: Session): Promise<boolean> {
        try{
            const result = await pool.query('INSERT INTO sessions (user_id, session_token, session_expiry) VALUES ($1, $2, $3) RETURNING *', [data.user_id, data.session_token, data.session_expiry]);
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_login_topic);
    }
}

export class LogoutConsumerSingleton extends ConsumerSingleton<Session> {
    protected async processMessage(data: Session): Promise<boolean> {
        try{
            await pool.query('DELETE FROM sessions WHERE session_token = $1', [data.session_token]);
            return true;
        }catch(error){
            return false;
        }
    }
    constructor(serviceName: string) {
        super(serviceName, on_logout_topic);
    }
}





*/
