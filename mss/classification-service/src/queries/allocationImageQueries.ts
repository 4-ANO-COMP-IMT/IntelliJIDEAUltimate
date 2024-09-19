import { PoolClient } from '@intelij-ultimate/postgres-utility';
import { AllocationImageDB } from '../interfaces';

const insertImageQuery = 'INSERT INTO allocation_images (image_id, image_url) VALUES ($1, $2) RETURNING *';
const selectPendingImageQuery = 'SELECT * FROM allocation_images WHERE classification_status = \'pending\' LIMIT 1';
const selectReservedImageQuery = 'SELECT * FROM allocation_images WHERE classification_status = \'reserved\' AND user_id = $1 LIMIT 1';
const selectAllClassifiedImagesQuery = 'SELECT * FROM allocation_images WHERE classification_status = \'classified\' ORDER BY timestamp_classification DESC';
const updateImageToReservedQuery = 'UPDATE allocation_images SET classification_status = \'reserved\', timestamp_reservation = NOW(), user_id = $1 WHERE image_id = $2 RETURNING *';
const updateImageToClassifiedQuery = 'UPDATE allocation_images SET classification_status = \'classified\', timestamp_classification = NOW() WHERE image_id = $1 RETURNING *';

/*
CREATE TABLE allocation_images (
    image_id SERIAL PRIMARY KEY,                -- Chave primária com incremento automático
    image_url VARCHAR(200) NOT NULL,            -- URL da imagem, não pode ser nulo
    classification_status VARCHAR(50) DEFAULT 'pending',  -- Estado da classificação (ex: 'pending', 'reserved', 'classified')
    user_id INTEGER REFERENCES users(user_id),  -- Referência à tabela de usuários
    timestamp_reservation TIMESTAMP DEFAULT NULL, -- Data e hora da reserva
    timestamp_classification TIMESTAMP DEFAULT NULL -- Data e hora da classificação
);
*/

export const insertImageInDB = async (client: PoolClient, image_id:number,image_url:string): Promise<AllocationImageDB> => {
    const result = await client.query(insertImageQuery, [image_id, image_url]);
    return result.rows[0];
}

export const selectPendingImage = async (client: PoolClient): Promise<AllocationImageDB | null> => {
    const result = await client.query(selectPendingImageQuery);
    return result.rows[0] || null;
}

export const selectReservedImage = async (client: PoolClient, user_id: number): Promise<AllocationImageDB | null> => {
    const result = await client.query(selectReservedImageQuery, [user_id]);
    return result.rows[0] || null;
}

export const selectAllClassifiedImages = async (client: PoolClient): Promise<AllocationImageDB[]> => {
    const result = await client.query(selectAllClassifiedImagesQuery);
    return result.rows;
}

export const updateImageStatusToReserved = async (client: PoolClient, image_id: number, user_id: number): Promise<AllocationImageDB> => {
    const result = await client.query(updateImageToReservedQuery, [user_id, image_id]);
    return result.rows[0];
}

export const updateImageStatusToClassified = async (client: PoolClient, image_id: number): Promise<AllocationImageDB> => {
    return (await client.query(updateImageToClassifiedQuery, [image_id])).rows[0];
}