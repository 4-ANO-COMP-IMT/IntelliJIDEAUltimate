import { Request, Response } from 'express';
import { validateLogin } from '../services/validationService';
import { createSession } from '../services/sessionService';
import { publishToFanoutExchange } from '../services/rabbitMQService';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // Validate user credentials
    console.log('Validating login');
    console.log('username:', username);
    console.log('password:', password);
    console.log('validating login');
    var user_id = await validateLogin(username, password);
    if (!user_id) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Create session token
    var sessionToken = await createSession(user_id);
    if (!sessionToken) {
      console.log('could not create session');
      return res.status(500).json({ message: 'could not create session' }); 
    }

    console.log('publishing to queue');
    await publishToFanoutExchange('user_logged_in_exchange', { user_id, sessionToken });
    
    console.log('Login successful');
    res.json({ message: 'Login successful' , sessionToken });
  } 
  catch (error) {
    console.log('error:', error);
    res.status(500).json({ message: `error: ${error}` });
  }

};


