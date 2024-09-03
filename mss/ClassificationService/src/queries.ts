import { pool } from "@intelij-ultimate/postgres-utility";
import { RectangleDB, RectangleReq } from './interfaces'

export const insertRectangleQuery = 'INSERT INTO rectangles (id_serial, image_id, class_name, center_x, center_y, width, height, user_id) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *';

export const insertRectangleInDB = async (rect: RectangleReq, user_id: number): Promise<RectangleDB> => {
    const {image_id, class_name, center_x, center_y, width, height} = rect;
    const result = await pool.query(insertRectangleQuery, [image_id, class_name, center_x, center_y, width, height, user_id]);
    return result.rows[0];
}