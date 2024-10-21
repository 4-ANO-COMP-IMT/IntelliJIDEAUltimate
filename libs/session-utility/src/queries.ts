//todo : fazer arquivo separado para owner e replica

import { pool } from '@intelij-ultimate/postgres-utility';
import { Session } from './interfaces';

export const createSessionQuery = 'INSERT INTO sessions (user_id, session_token, session_expiry) VALUES ($1, $2, $3) RETURNING *';
export const getSessionByTokenQuery = 'SELECT * FROM sessions WHERE session_token = $1';
export const deleteSessionQuery = 'DELETE FROM sessions WHERE session_token = $1';
export const deleteAllSessionsForUserQuery = 'DELETE FROM sessions WHERE user_id = $1';
export const deleteExpiredSessionsQuery = 'DELETE FROM sessions WHERE session_expiry < $1';

export const createSessionInDB = async (userId: number, sessionToken: string, sessionExpiry: Date): Promise<Session> => {
    const result = await pool.query(createSessionQuery, [userId, sessionToken, sessionExpiry]);
    return result.rows[0];
}

export const fetchSessionByToken = async (sessionToken: string): Promise<Session | null> => {
    const result = await pool.query(getSessionByTokenQuery, [sessionToken]);
    return result.rows[0] || null;
}

export const removeSessionByToken = async (sessionToken: string): Promise<void> => {
    await pool.query(deleteSessionQuery, [sessionToken]);
}

export const clearAllSessionsForUser = async (userId: number): Promise<void> => {
    await pool.query(deleteAllSessionsForUserQuery, [userId]);
}

export const clearExpiredSessions = async (currentDate: Date): Promise<void> => {
    await pool.query(deleteExpiredSessionsQuery, [currentDate]);
}
