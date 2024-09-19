import { pool } from '@intelij-ultimate/postgres-utility';
import type { PoolClient } from '@intelij-ultimate/postgres-utility';
import { RectangleDB, RectangleReq } from '../interfaces';
import { insertRectangleInDB } from '../queries/classificationQueries';
import { updateImageStatusToClassified } from '../queries/allocationImageQueries';
import { selectRectanglesByImageId } from '../queries/classificationQueries';

export async function insertClassification(rectangles: RectangleReq[], image_id: number): Promise<RectangleDB[]> {
    
    const client:PoolClient = await pool.connect();

    try {
        await client.query('BEGIN'); // Inicia a transação

        // Atualiza o status da imagem para 'classified'
        const allocationImageDB = await updateImageStatusToClassified(client, image_id);
        if(!allocationImageDB) {
            console.warn("Warning: Não existe allocation image, mas criando a classificação mesmo assim");
        }

        // Mapeia todos os retângulos recebidos para promises de inserção
        const promises = rectangles.map(rect => insertRectangleInDB(client, rect, image_id));
        const results = await Promise.all(promises); // Aguarda a conclusão de todas as promises mapeadas

        await client.query('COMMIT'); // Confirma a transação
        return results;
    } catch (error: any) {
        await client.query('ROLLBACK'); // Reverte a transação em caso de erro
        console.log('Erro ao inserir classificação: ' + error.message);
        throw error; // Repassa o erro para tratamento externo, se necessário
    } finally {
        client.release(); // Libera o cliente de volta ao pool
    }
}


export async function getRectanglesByImageId(image_id: number): Promise<RectangleDB[]> {
    return selectRectanglesByImageId(image_id);
}