import { Request, Response } from 'express';
import { validateLogin } from '../services/validationService';
import { createSession } from '@intelij-ultimate/session-utility';
import { LoginPublisherSingleton } from '@intelij-ultimate/session-utility';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    var user_id = await validateLogin(username, password);
    if (!user_id) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    var session = await createSession(user_id);
    if (!session) {
      console.log('could not create session');
      return res.status(500).json({ message: 'could not create session' }); 
    }
    console.log('session:', session);
    await LoginPublisherSingleton.getInstance("on_login").publish(session);
    console.log('LoginPublisherSingleton published');
    
    res.json({ message: 'Login successful' , session_token: session.session_token});
  } 
  catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: `error: ${error}` });
  }

};


