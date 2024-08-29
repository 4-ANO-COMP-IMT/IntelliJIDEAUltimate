import { pool } from '../connection';
import { Session } from './interfaces';

export const createSessionQuery = 'INSERT INTO sessions (user_id, session_token, session_expiry) VALUES ($1, $2, $3) RETURNING *';
export const getSessionByTokenQuery = 'SELECT * FROM sessions WHERE session_token = $1';
export const deleteSessionQuery = 'DELETE FROM sessions WHERE session_token = $1';
export const deleteAllSessionsQuery = 'DELETE FROM sessions WHERE user_id = $1';
export const deleteExpiredSessionsQuery = 'DELETE FROM sessions WHERE session_expiry < $1';
export const deleteAllSessionsByUserIdQuery = 'DELETE FROM sessions WHERE user_id = $1';

// CREATE TABLE sessions (
//     session_id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL,
//     session_token VARCHAR(255) UNIQUE NOT NULL,
//     session_expiry TIMESTAMP NOT NULL
// );


export const createSession = async (userId: number, sessionToken: string, sessionExpiry: Date): Promise<Session> => {
    const result = await pool.query(createSessionQuery, [userId, sessionToken, sessionExpiry]);
    return result.rows[0];
}

export const getSessionByToken = async (sessionToken: string): Promise<Session | null> => {
    const result = await pool.query(getSessionByTokenQuery, [sessionToken]);
    return result.rows[0] || null;
}

export const deleteSession = async (sessionToken: string): Promise<void> => {
    await pool.query(deleteSessionQuery, [sessionToken]);
}

export const deleteAllSessions = async (userId: number): Promise<void> => {
    await pool.query(deleteAllSessionsQuery, [userId]);
}

export const deleteExpiredSessions = async (currentDate: Date): Promise<void> => {
    await pool.query(deleteExpiredSessionsQuery, [currentDate]);
}

export const deleteAllSessionsByUserId = async (userId: number): Promise<void> => {
    await pool.query(deleteAllSessionsByUserIdQuery, [userId]);
}
