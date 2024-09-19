import { pool } from '../database/connection';
import { User } from '../database/user/interfaces'
import {getUserByUsername } from '../database/user/queries';

export const validateLogin = async (username: string, password: string): Promise<User|null> => {
  var user = await getUserByUsername(username);
  if (user == null) {
    return null;
  }

  if (user.password === password) {
    return user;
  }

  return null;
}



