import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  USER,
  PASSWORD,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  NODE_ENV
} = process.env;
