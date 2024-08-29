import { Request, Response } from 'express';
import { addUserToDatabase } from '../services/userService';
import { publishToExchange } from '../services/rabbitMQService';

export const registerUser = async (req: Request, res: Response) => {
  const { new_username, new_password } = req.body;
  try {
    const user = await addUserToDatabase(new_username, new_password);
    console.log(`User registered: ${user.user_name} with id: ${user.user_id}`);
    await publishToExchange('userRegisteredEvent', {
      username: user.user_name,
      password: user.user_password,
      id: user.user_id,
      isAdmin: user.user_is_admin,
    });
    res.status(200).json(user);
  } catch (e) {
    console.log('Caught Exception:\n' + e);
    res.status(500).end();
  }
};
