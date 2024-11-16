import { Request, Response, NextFunction } from 'express';
// import {validateToken,getUserIdFromToken} from '../services/sessionService'
import { fetchSessionByToken } from '@intelij-ultimate/session-utility'
import { getUserById } from '@intelij-ultimate/user-utility'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const session_token = req.headers['authorization']?.split(' ').pop();
  
  if (!session_token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const session = await fetchSessionByToken(session_token);
 
  if (!session) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  if (session.session_expiry < new Date()) {
    res.status(401).json({ message: 'Token expired' });
    return;
  }

  req.body.user_id = session.user_id;
  next();
};


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const session_token = req.headers['authorization']?.split(' ').pop();
    
    if (!session_token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
  
    // Check if token is valid
    const session = await fetchSessionByToken(session_token);
    
    if (!session) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    if (session.session_expiry < new Date()) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }

    const user = await getUserById(session.user_id)

    if ( !user ) {
      res.status(401).json({ message: 'invalid user' });
      return;
    }

    if ( !user.is_admin) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    req.body.user_id = session.user_id;
    next();
}

