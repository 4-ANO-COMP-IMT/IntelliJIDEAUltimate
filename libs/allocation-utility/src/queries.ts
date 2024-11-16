import { pool } from '@intelij-ultimate/postgres-utility';
import { ImageAllocated } from './interfaces';

/*

CREATE TABLE images_allocated (
  allocation_id SERIAL PRIMARY KEY,
  image_id INTEGER NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  allocation_timestamp TIMESTAMP NOT NULL
);

 */

export const getImageAllocatedByIdQuery = 'SELECT * FROM images_allocated WHERE allocation_id = $1';
export const getImageAllocatedByImageIdQuery = 'SELECT * FROM images_allocated WHERE image_id = $1';
export const getAllImagesAllocatedByUserIdQuery = 'SELECT * FROM images_allocated WHERE user_id = $1';
export const createImageAllocatedQuery = 'INSERT INTO images_allocated (image_id, user_id, allocation_timestamp) VALUES ($1, $2, $3) RETURNING *';
export const deleteImageAllocatedQuery = 'DELETE FROM images_allocated WHERE allocation_id = $1';
export const deleteImageAllocatedByImageIdQuery = 'DELETE FROM images_allocated WHERE image_id = $1';
export const deleteAllImagesAllocatedByUserIdQuery = 'DELETE FROM images_allocated WHERE user_id = $1';
export const updateImageAllocatedQuery = 'UPDATE images_allocated SET image_id = $1, user_id = $2, allocation_timestamp = $3 WHERE allocation_id = $4';
export const getAllImagesAllocatedQuery = 'SELECT * FROM images_allocated';

export const getImageAllocatedById = async (allocationId: number): Promise<ImageAllocated | null> => {
  const result = await pool.query(getImageAllocatedByIdQuery, [allocationId]);
  return result.rows[0] || null;
}

export const getImageAllocatedByImageId = async (imageId: number): Promise<ImageAllocated | null> => {
  const result = await pool.query(getImageAllocatedByImageIdQuery, [imageId]);
  return result.rows[0] || null;
}

export const getAllImagesAllocatedByUserId = async (userId: number): Promise<ImageAllocated[]> => {
  const result = await pool.query(getAllImagesAllocatedByUserIdQuery, [userId]);
  return result.rows;
}

export const createImageAllocated = async (imageId: number, userId: number, allocationTimestamp: Date): Promise<ImageAllocated> => {
  const result = await pool.query(createImageAllocatedQuery, [imageId, userId, allocationTimestamp]);
  return result.rows[0];
}

export const deleteImageAllocated = async (allocationId: number): Promise<void> => {
  await pool.query(deleteImageAllocatedQuery, [allocationId]);
}

export const deleteImageAllocatedByImageId = async (imageId: number): Promise<void> => {
  await pool.query(deleteImageAllocatedByImageIdQuery, [imageId]);
}

export const deleteAllImagesAllocatedByUserId = async (userId: number): Promise<void> => {
  await pool.query(deleteAllImagesAllocatedByUserIdQuery, [userId]);
}

export const updateImageAllocated = async (imageId: number, userId: number, allocationTimestamp: Date, allocationId: number): Promise<void> => {
  await pool.query(updateImageAllocatedQuery, [imageId, userId, allocationTimestamp, allocationId]);
}

export const getAllImagesAllocated = async (): Promise<ImageAllocated[]> => {
  const result = await pool.query(getAllImagesAllocatedQuery);
  return result.rows;
}
