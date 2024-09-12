import { Request, Response } from 'express';
import { fetchSessionByToken, removeSessionByToken } from '@intelij-ultimate/session-utility';
import { LogoutPublisherSingleton,deleteSession } from '@intelij-ultimate/session-utility';

export const logout = async (req: Request, res: Response) => {
  // Implementação do logout
  try {
    const session_token = req.headers.authorization;
    if (!session_token) {
      return res.status(401).json({ message: 'No credentials' });
    }
    let session = await fetchSessionByToken(session_token);
    if (!session) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    await deleteSession(session);
    LogoutPublisherSingleton.getInstance("on_logout").publish(session);
    
    res.json({ message: 'Logout successful' });
  }catch(error){
    res.status(401).json({ message: 'Invalid token' });
  }
  
};