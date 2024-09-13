
/*
CREATE TABLE images(
    image_id SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    filetype VARCHAR(255)
)
*/

//todo : fazer arquivo separado para owner e replica

import { pool } from '@intelij-ultimate/postgres-utility';
import { ImageDB, Image } from './interfaces';


export const createImageQuery = 'INSERT INTO images (filename, filetype) VALUES ($1, $2) RETURNING *';
export const getImageByIdQuery = 'SELECT * FROM Image WHERE id = $1';
export const getImageByTokenQuery = 'SELECT * FROM Image WHERE image_token = $1';
export const deleteImageQuery = 'DELETE FROM Image WHERE id = $1';
export const deleteImageByTokenQuery = 'DELETE FROM Image WHERE image_token = $1';

export const createImageInDB = async (image: Image): Promise<ImageDB> => {
    const {filename, filetype} = image;
    const result = await pool.query(createImageQuery, [filename, filetype]);
    return result.rows[0];
}

export const fetchImageById = async (id: number): Promise<ImageDB | null> => {
    const result = await pool.query(getImageByIdQuery, [id]);
    return result.rows[0] || null;
}

export const fetchImageByToken = async (imageToken: string): Promise<ImageDB | null> => {
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
