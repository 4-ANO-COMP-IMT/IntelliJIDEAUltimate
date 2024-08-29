import { pool } from '../database/connection';
import { addUserQuery } from '../database/queries';

export const addUserToDatabase = async (username: string, password: string) => {
  const res = await pool.query(addUserQuery, [username, password, false]);
  return res.rows[0];
};
