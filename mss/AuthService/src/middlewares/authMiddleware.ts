import { Request, Response, NextFunction } from 'express';
import {validateToken,getUserIdFromToken} from '../services/sessionService'
import { getUserById } from '../database/user/queries'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Check if token is valid
  const is_valid = validateToken(token)
  if (!is_valid) return res.status(401).json({ message: 'Invalid token' });

  next();
};


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Check if token is valid
  const is_valid = validateToken(token)
  if (!is_valid) return res.status(401).json({ message: 'Invalid token' });

  // Check if user is admin
  const user_id = await getUserIdFromToken(token)
  
  if (!user_id) return res.status(401).json({ message: 'Invalid token' });

  const user = await getUserById(user_id)

  if (user && !user.is_admin) return res.status(403).json({ message: 'Unauthorized' });

  next();
}

