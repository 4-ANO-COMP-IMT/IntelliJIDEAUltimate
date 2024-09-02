import { Request, Response, NextFunction } from 'express';
// import {validateToken,getUserIdFromToken} from '../services/sessionService'
import { fetchSessionByToken } from '@intelij-ultimate/session-utility'
import { getUserById } from '@intelij-ultimate/user-utility'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const session_token = req.headers['authorization']?.split(' ').pop();
  
  if (!session_token) return res.status(401).json({ message: 'No token provided' });

  const session = await fetchSessionByToken(session_token);
 
  if (!session) return res.status(401).json({ message: 'Invalid token' });

  if (session.session_expiry < new Date()) return res.status(401).json({ message: 'Token expired' });
  next();
};


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = req.headers['authorization']?.split(' ').pop();
    
    if (!session_token) return res.status(401).json({ message: 'No token provided' });
  
    // Check if token is valid
    const session = await fetchSessionByToken(session_token);
    
    if (!session) return res.status(401).json({ message: 'Invalid token' });

    if (session.session_expiry < new Date()) return res.status(401).json({ message: 'Token expired' });

    const user = await getUserById(session.user_id)

    if ( !user ) return res.status(401).json({ message: 'invalid user' });

    if ( !user.is_admin) return res.status(403).json({ message: 'Unauthorized' });

    next();
}

