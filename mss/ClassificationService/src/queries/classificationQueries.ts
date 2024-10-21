import { pool, PoolClient } from '@intelij-ultimate/postgres-utility';
import { RectangleDB, RectangleReq } from '../interfaces';

const insertRectangleQuery = 'INSERT INTO rectangles (image_id, class_name, center_x, center_y, width, height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
const selectRectanglesByImageIdQuery = 'SELECT * FROM rectangles WHERE image_id = $1 ORDER BY rectangle_id ASC'


export const insertRectangleInDB = async (client: PoolClient, rect: RectangleReq, image_id: number): Promise<RectangleDB> => {
    const { class_name, center_x, center_y, width, height } = rect;
    const result = await client.query(insertRectangleQuery, [image_id, class_name, center_x, center_y, width, height]);
    return result.rows[0];
}

export const selectRectanglesByImageId = async (image_id: number): Promise<RectangleDB[]> => {
    const result = await pool.query(selectRectanglesByImageIdQuery, [image_id]);
    return result.rows;
}