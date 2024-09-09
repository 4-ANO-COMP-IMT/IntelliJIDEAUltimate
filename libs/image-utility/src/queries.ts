
/*
CREATE TABLE Image(
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    filetype VARCHAR(255),
    image_token VARCHAR(255)
)
*/

//todo : fazer arquivo separado para owner e replica

import { pool } from '@intelij-ultimate/postgres-utility';
import { Image } from './interfaces';


export const createImageQuery = 'INSERT INTO Image (filename, filetype, image_token) VALUES ($1, $2, $3) RETURNING *';
export const getImageByIdQuery = 'SELECT * FROM Image WHERE id = $1';
export const getImageByTokenQuery = 'SELECT * FROM Image WHERE image_token = $1';
export const deleteImageQuery = 'DELETE FROM Image WHERE id = $1';
export const deleteImageByTokenQuery = 'DELETE FROM Image WHERE image_token = $1';

export const createImageInDB = async (filename: string, filetype: string, imageToken: string): Promise<Image> => {
    const result = await pool.query(createImageQuery, [filename, filetype, imageToken]);
    return result.rows[0];
}

export const fetchImageById = async (id: number): Promise<Image | null> => {
    const result = await pool.query(getImageByIdQuery, [id]);
    return result.rows[0] || null;
}

export const fetchImageByToken = async (imageToken: string): Promise<Image | null> => {
    const result = await pool.query(getImageByTokenQuery, [imageToken]);
    return result.rows[0] || null;
}

export const removeImageById = async (id: number): Promise<void> => {
    await pool.query(deleteImageQuery, [id]);
}

export const removeImageByToken = async (imageToken: string): Promise<void> => {
    await pool.query(deleteImageByTokenQuery, [imageToken]);
}

export const clearAllImages = async (): Promise<void> => {
    await pool.query('DELETE FROM Image');
}

export const clearAllImagesForUser = async (userId: number): Promise<void> => {
    await pool.query('DELETE FROM Image WHERE user_id = $1', [userId]);
}
