import { pool } from "@intelij-ultimate/postgres-utility";
import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import { Session } from "./interfaces";
import { on_login_topic, on_logout_topic } from "./topics";

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
