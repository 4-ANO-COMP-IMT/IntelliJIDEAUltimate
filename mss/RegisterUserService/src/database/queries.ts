import { pool } from './connection';

export const addUserQuery = 'INSERT INTO users (user_name, user_password, user_is_admin) VALUES (, , ) RETURNING *';
export const createSessionQuery = 'INSERT INTO sessions (session_id, session_token, session_timestamp, user_id) VALUES (, , , )';
