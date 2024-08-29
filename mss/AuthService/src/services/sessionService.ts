import { pool } from '../database/connection';
import { Session } from '../database/session/interfaces';
import {createSession as createSessionDB,deleteSession as deleteSessionDB}  from '../database/session/queries';
import { v4 as uuidv4 } from 'uuid';

export async function deleteSession(sessionToken: string){
    // Delete the session from the database
    deleteSessionDB(sessionToken);
}

export async function createSession(user_id: number){
    // Generate a random uuid session token
    const sessionToken = uuidv4();

    // Set expiry date to 1 day from now
    const sessionExpiry = new Date();
    sessionExpiry.setDate(sessionExpiry.getDate() + 1);
   
    return await createSessionDB(user_id, sessionToken, sessionExpiry);
}

export async function validateToken(sessionToken: string): Promise<boolean> {
    // Query the database to check if the session token is valid
    const session = await pool.query<Session>('SELECT * FROM sessions WHERE session_token = $1', [sessionToken]);

    // If a session is found and the expiry date is in the future, the token is valid
    if (session.rows.length > 0 && session.rows[0].session_expiry_date > new Date()) {
        return true;
    }

    return false;
}

export async function getUserIdFromToken(sessionToken: string): Promise<number | null> {
    // Query the database to get the user ID associated with the session token
    const session = await pool.query<Session>('SELECT * FROM sessions WHERE session_token = $1', [sessionToken]);

    // If a session is found and the expiry date is in the future, return the user ID
    if (session.rows.length > 0 && session.rows[0].session_expiry_date > new Date()) {
        return session.rows[0].user_id;
    }

    return null;
}