import { Request, Response } from 'express';
import { deleteSession } from '../services/sessionService';

export const logout = async (req: Request, res: Response) => {
  // Implementação do logout
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No credentials' });
    }
    await deleteSession(token);
    res.json({ message: 'Logout successful' });
  }catch(error){
    res.status(401).json({ message: 'Invalid token' });
  }
  
};