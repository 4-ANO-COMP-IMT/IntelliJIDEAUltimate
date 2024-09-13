/* import { pool } from "@intelij-ultimate/postgres-utility";
import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import amqp from 'amqplib';
import { Image } from "./interfaces";
import { on_image_received_topic } from "./topics";

export const query = `INSERT INTO images (id, filename, filetype, image_token) VALUES ($1, $2, $3, $4) RETURNING *`;
export class ImageConsumer extends ConsumerSingleton<Image> {
    protected async processMessage(data: Image): Promise<boolean> {
        try{
            const result = await pool.query(query, [data.image_id, data.filename, data.filetype, data.image_token]);
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_image_received_topic);
    }
} */