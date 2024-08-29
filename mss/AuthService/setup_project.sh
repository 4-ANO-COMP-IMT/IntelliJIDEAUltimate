#!/bin/bash

# Criar diretórios
mkdir -p src/config src/controllers src/models src/routes src/services src/utils src/database src/middlewares

# Criar e adicionar conteúdo aos arquivos

# env.ts
cat <<EOL > src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  SERVICE_NAME,
  JWT_SECRET,
  ENCRYPTION_KEY,
  NODE_ENV
} = process.env;
EOL

# authController.ts
cat <<EOL > src/controllers/authController.ts
import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await authService.authenticate(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // Implementação do logout
};
EOL

# userController.ts
cat <<EOL > src/controllers/userController.ts
import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  // Implementação da criação de usuário
};
EOL

# index.ts (controllers)
cat <<EOL > src/controllers/index.ts
export * from './authController';
export * from './userController';
EOL

# userModel.ts
cat <<EOL > src/models/userModel.ts
import { Pool } from 'pg';
import { pool } from '../database/connection';

export const getUserById = async (userId: string) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return result.rows[0];
};

// Outros métodos relacionados a usuários
EOL

# sessionModel.ts
cat <<EOL > src/models/sessionModel.ts
import { pool } from '../database/connection';

export const createSession = async (userId: number, sessionToken: string, expiryDate: Date) => {
  const result = await pool.query(
    'INSERT INTO sessions (user_id, session_token, session_expiry) VALUES ($1, $2, $3) RETURNING *',
    [userId, sessionToken, expiryDate]
  );
  return result.rows[0];
};

// Outros métodos relacionados a sessões
EOL

# authRoutes.ts
cat <<EOL > src/routes/authRoutes.ts
import { Router } from 'express';
import { login, logout } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
EOL

# userRoutes.ts
cat <<EOL > src/routes/userRoutes.ts
import { Router } from 'express';
import { getUser, createUser } from '../controllers/userController';

const router = Router();

router.get('/:id', getUser);
router.post('/', createUser);

export default router;
EOL

# index.ts (routes)
cat <<EOL > src/routes/index.ts
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
EOL

# authService.ts
cat <<EOL > src/services/authService.ts
import { userService } from './userService';
import { JWT_SECRET } from '../config/env';
import jwt from 'jsonwebtoken';

export const authenticate = async (username: string, password: string) => {
  const user = await userService.validateUserCredentials(username, password);
  if (user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: '1h' });
  }
  throw new Error('Invalid credentials');
};

// Outros métodos relacionados à autenticação
EOL

# userService.ts
cat <<EOL > src/services/userService.ts
import { getUserById } from '../models/userModel';

export const getUserByIdService = async (userId: string) => {
  return await getUserById(userId);
};

export const validateUserCredentials = async (username: string, password: string) => {
  // Implementar lógica de validação de credenciais
};

// Outros métodos relacionados a usuários
EOL

# rabbitMQService.ts
cat <<EOL > src/services/rabbitMQService.ts
import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from '../config/env';

const rabbitMQUrl = \`amqp://\${RABBITMQ_USER}:\${RABBITMQ_PASSWORD}@\${RABBITMQ_HOST}:\${RABBITMQ_PORT}\`;

export const publishToQueue = async (queueName: string, data: any) => {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  setTimeout(() => {
    connection.close();
  }, 500);
};
EOL

# logger.ts
cat <<EOL > src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // Adicionar outros transportes como arquivo ou banco de dados
  ],
});

export default logger;
EOL

# eventHandler.ts
cat <<EOL > src/utils/eventHandler.ts
export const handleEvent = (eventType: string, data: any) => {
  switch (eventType) {
    case 'USER_REGISTERED':
      console.log('Handling user registered event', data);
      break;
    // Adicionar outros casos de eventos
    default:
      console.log('Event not handled:', eventType);
  }
};
EOL

# helpers.ts
cat <<EOL > src/utils/helpers.ts
export const generateRandomToken = () => {
  return Math.random().toString(36).substr(2);
};

// Outras funções auxiliares
EOL

# connection.ts
cat <<EOL > src/database/connection.ts
import { Pool } from 'pg';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } from '../config/env';

export const pool = new Pool({
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
EOL

# queries.ts
cat <<EOL > src/database/queries.ts
export const getUserByIdQuery = 'SELECT * FROM users WHERE user_id = $1';

// Outros queries SQL
EOL

# authMiddleware.ts
cat <<EOL > src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.body.userId = (decoded as any).userId;
    next();
  });
};
EOL

# errorHandler.ts
cat <<EOL > src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};
EOL

# index.ts
cat <<EOL > src/index.ts
import express from 'express';
import routes from './routes';
import { PORT } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

echo "Estrutura de projeto criada com sucesso!"
