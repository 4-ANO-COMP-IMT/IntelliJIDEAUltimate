import dotenv from 'dotenv';

dotenv.config();

export const {
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
} = process.env;
