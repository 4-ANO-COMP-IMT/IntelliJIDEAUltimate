import { Request, Response } from 'express';
import { fetchSessionByToken, removeSessionByToken } from '@intelij-ultimate/session-utility';
import { LogoutPublisherSingleton,deleteSession } from '@intelij-ultimate/session-utility';

export const logout = async (req: Request, res: Response): Promise<void> => {
  // Implementação do logout
  try {
    const session_token = req.headers.authorization;
    if (!session_token) {
      res.status(401).json({ message: 'No credentials' });
      return;
    }
    let session = await fetchSessionByToken(session_token);
    if (!session) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    await deleteSession(session);

    const logoutPublisher = await LogoutPublisherSingleton.getInstance();
    logoutPublisher.publish(session);
    
    res.json({ message: 'Logout successful' });
  }catch(error){
    res.status(401).json({ message: 'Invalid token' });
  }
  
};