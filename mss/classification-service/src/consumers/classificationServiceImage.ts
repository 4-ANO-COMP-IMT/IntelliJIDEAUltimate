import { ConsumerSingleton } from "@intelij-ultimate/rabbitmq-utility";
import { insertImageInDB } from "../queries/allocationImageQueries";
import { ImageAllocation, on_image_received_topic } from "@intelij-ultimate/image-utility";
import { pool } from "@intelij-ultimate/postgres-utility";
import { AllocationImageDB } from "../interfaces";

// Insere uma nova imagem na tabela de imagens
export async function insertNewImage(image_id: number, image_url: string): Promise<AllocationImageDB> {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await insertImageInDB(client, image_id, image_url);
        await client.query('COMMIT');
        return result;
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Erro ao inserir nova imagem: ' + error.message);
        throw error;
    } finally {
        client.release();
    }
}



export class ClassificationServiceImageConsumer extends ConsumerSingleton<ImageAllocation> {
    protected async processMessage(data: ImageAllocation): Promise<boolean> {
        try{
            await insertNewImage(data.image_id, data.image_url)
            return true;
        }catch(error){
            return false;
        }

    }
    constructor(serviceName: string) {
        super(serviceName, on_image_received_topic);
    }
}

