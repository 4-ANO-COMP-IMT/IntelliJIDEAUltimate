import { pool } from "@intelij-ultimate/postgres-utility";
import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import { ImageAllocated } from "./interfaces";
import { on_allocation_topic } from "./topics";

const query = `INSERT INTO images_allocated (allocation_id, image_id, user_id, allocation_timestamp) VALUES ($1, $2, $3, $4) RETURNING *`


export class AllocationConsumer extends ConsumerSingleton<ImageAllocated> {
    protected async processMessage(data: ImageAllocated): Promise<boolean> {
        try{
            const result = await pool.query(query, [data.allocation_id, data.image_id, data.user_id, data.allocation_timestamp]);
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_allocation_topic);
    }
}

