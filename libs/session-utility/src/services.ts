import { Session } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { createSessionInDB, fetchSessionByToken, removeSessionByToken } from './queries';

export async function createSession(userId: number): Promise<Session> {
    const sessionToken = uuidv4();
    const sessionExpiry = new Date();
    sessionExpiry.setDate(sessionExpiry.getDate() + 1);

    return await createSessionInDB(userId, sessionToken, sessionExpiry);
}

export async function deleteSession(session: Session): Promise<void> {
    await removeSessionByToken(session.session_token);
}

export async function validateToken(sessionToken: string): Promise<boolean> {
    const session = await fetchSessionByToken(sessionToken);
    return session ? isSessionValid(session) : false;
}

export async function getUserIdFromToken(sessionToken: string): Promise<number | null> {
    const session = await fetchSessionByToken(sessionToken);
    return session && isSessionValid(session) ? session.user_id : null;
}

function isSessionValid(session: Session): boolean {
    return session.session_expiry > new Date();
}
