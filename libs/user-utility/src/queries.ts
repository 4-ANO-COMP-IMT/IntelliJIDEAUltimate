import { pool } from '@intelij-ultimate/postgres-utility';
import { User } from './interfaces';

// username, password, is_admin

export const getUserByIdQuery = 'SELECT * FROM users WHERE user_id = $1';
export const getUserByUsernameQuery = 'SELECT * FROM users WHERE username = $1';
export const createUserQuery = 'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *';
export const deleteUserQuery = 'DELETE FROM users WHERE user_id = $1';
export const updateUserPasswordQuery = 'UPDATE users SET password = $1 WHERE user_id = $2';
export const updateUserUsernameQuery = 'UPDATE users SET username = $1 WHERE user_id = $2';
export const updateUserQuery = 'UPDATE users SET username = $1, password = $2 WHERE user_id = $3';
export const getUsersQuery = 'SELECT * FROM users';


// CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     is_admin BOOLEAN NOT NULL
// );

export const getUserById = async (userId: number): Promise<User | null> => {
  const result = await pool.query(getUserByIdQuery, [userId]);
  return result.rows[0] || null;
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
  console.log('getUserByUsernameQuery:', getUserByUsernameQuery);
  const result = await pool.query(getUserByUsernameQuery, [username]);
  return result.rows[0] || null;
}

export const createUser = async (username: string, password: string, is_admin: boolean): Promise<User> => {
  const result = await pool.query(createUserQuery, [username, password, is_admin]);
  return result.rows[0];
}

export const deleteUser = async (userId: number): Promise<void> => {
  await pool.query(deleteUserQuery, [userId]);
}

export const updateUserPassword = async (userId: number, newPassword: string): Promise<void> => {
  await pool.query(updateUserPasswordQuery, [newPassword, userId]);
}

export const updateUserUsername = async (userId: number, newUsername: string): Promise<void> => {
  await pool.query(updateUserUsernameQuery, [newUsername, userId]);
}

export const updateUser = async (userId: number, newUsername: string, newPassword: string): Promise<void> => {
  await pool.query(updateUserQuery, [newUsername, newPassword, userId]);
}

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query(getUsersQuery);
  return result.rows;
}

