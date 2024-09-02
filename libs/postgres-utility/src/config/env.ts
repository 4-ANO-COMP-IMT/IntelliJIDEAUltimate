import dotenv from 'dotenv';

dotenv.config();

export const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env;
