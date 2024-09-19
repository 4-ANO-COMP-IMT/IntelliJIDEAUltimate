import { pool } from '@intelij-ultimate/postgres-utility';
import type { PoolClient } from '@intelij-ultimate/postgres-utility';
import { AllocationImageDB } from '../interfaces';
import { selectAllClassifiedImages, selectPendingImage, selectReservedImage, updateImageStatusToReserved } from '../queries/allocationImageQueries';

// Requisita uma imagem para o usuário classificar
export async function requestImageForClassification(user_id: number): Promise<AllocationImageDB | null> {
    const client: PoolClient = await pool.connect();
    try {
        // Tenta buscar uma imagem já reservada para o usuário
        const reservedImage = await selectReservedImage(client, user_id);
        if (reservedImage) return reservedImage;

        // Caso não tenha imagem reservada, busca uma pendente
        const pendingImage = await selectPendingImage(client);
        if (!pendingImage) {
            console.log('Não há imagens disponíveis.');
            return null;
        }

        // Reserva a imagem pendente para o usuário
        await client.query('BEGIN');
        const reserved = await updateImageStatusToReserved(client, pendingImage.image_id, user_id);
        await client.query('COMMIT');
        return reserved;
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.error('Erro ao requisitar imagem para classificação: ' + error.message);
        throw error;
    } finally {
        client.release();
    }
}

// Requisita todas imagens (id e url)
export async function requestAllClassifiedImages(): Promise<AllocationImageDB[]> {
    const client: PoolClient = await pool.connect();
    try {

        return await selectAllClassifiedImages(client);

    } catch (error: any) {
        console.error('Erro ao requisitar imagem para classificação: ' + error.message);
        throw error;
    } finally {
        client.release();
    }
}
