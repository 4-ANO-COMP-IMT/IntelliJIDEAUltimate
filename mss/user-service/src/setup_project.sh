#!/bin/bash

# Criando diretórios
mkdir -p config controllers database/session database/user middlewares routes services utils types

# Criando arquivos e escrevendo conteúdo

# config/env.ts
cat <<EOL > config/env.ts
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
EOL

# database/connection.ts
cat <<EOL > database/connection.ts
import { Pool } from 'pg';
import { USER, PASSWORD } from '../config/env';

export const pool = new Pool({
  user: USER,
  host: 'localhost',
  database: 'RegisterUserService',
  password: PASSWORD,
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
EOL

# database/queries.ts
cat <<EOL > database/queries.ts
import { pool } from './connection';

export const addUserQuery = 'INSERT INTO users (user_name, user_password, user_is_admin) VALUES ($1, $2, $3) RETURNING *';
export const createSessionQuery = 'INSERT INTO sessions (session_id, session_token, session_timestamp, user_id) VALUES ($1, $2, $3, $4)';
EOL

# services/rabbitMQService.ts
cat <<EOL > services/rabbitMQService.ts
import amqp from 'amqplib';
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } from '../config/env';

const rabbitMQUrl = \`amqp://\${RABBITMQ_USER}:\${RABBITMQ_PASSWORD}@\${RABBITMQ_HOST}:\${RABBITMQ_PORT}\`;

export const publishToExchange = async (exchangeName: string, data: any, exchangeType = 'fanout') => {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, exchangeType, { durable: false });
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
  setTimeout(() => connection.close(), 500);
};
EOL

# services/userService.ts
cat <<EOL > services/userService.ts
import { pool } from '../database/connection';
import { addUserQuery } from '../database/queries';

export const addUserToDatabase = async (username: string, password: string) => {
  const res = await pool.query(addUserQuery, [username, password, false]);
  return res.rows[0];
};
EOL

# services/eventService.ts
cat <<EOL > services/eventService.ts
import { pool } from '../database/connection';
import { createSessionQuery } from '../database/queries';

interface UserValidatedEvent {
  session_id: number;
  session_token: string;
  validation_timestamp: string;
  user_id: number;
}

interface UserRegisteredEvent {
  username: string;
  password: string;
  id: number;
  isAdmin: boolean;
}

export const events: Record<string, (arg: any) => Promise<any>> = {
  userValidatedSuccessfulEvent: async (event: UserValidatedEvent) => {
    await pool.query(createSessionQuery, [
      event.session_id,
      event.session_token,
      event.validation_timestamp,
      event.user_id,
    ]);
    console.log(\`New user authenticated: \${event.session_token}\`);
  },
  userRegisteredEvent: async (event: UserRegisteredEvent) => {
    console.log(\`New user registered: \${event.username}\`);
  },
};
EOL

# controllers/userController.ts
cat <<EOL > controllers/userController.ts
import { Request, Response } from 'express';
import { addUserToDatabase } from '../services/userService';
import { publishToExchange } from '../services/rabbitMQService';

export const registerUser = async (req: Request, res: Response) => {
  const { new_username, new_password } = req.body;
  try {
    const user = await addUserToDatabase(new_username, new_password);
    console.log(\`User registered: \${user.user_name} with id: \${user.user_id}\`);
    await publishToExchange('userRegisteredEvent', {
      username: user.user_name,
      password: user.user_password,
      id: user.user_id,
      isAdmin: user.user_is_admin,
    });
    res.status(200).json(user);
  } catch (e) {
    console.log('Caught Exception:\\n' + e);
    res.status(500).end();
  }
};
EOL

# routes/index.ts
cat <<EOL > routes/index.ts
import { Router } from 'express';
import { registerUser } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);

export default router;
EOL

# middlewares/errorHandler.ts
cat <<EOL > middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};
EOL

# utils/sleep.ts
cat <<EOL > utils/sleep.ts
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
EOL

# index.ts
cat <<EOL > index.ts
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { PORT } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { sleep } from './utils/sleep';
import axios from 'axios';
import { publishToExchange } from './services/rabbitMQService';
import { events } from './services/eventService';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(errorHandler);

const myService = {
  service_name: "RegisterUserService",
  host: "localhost",
  port: PORT,
};

const startup = async (attempts: number) => {
  while (attempts > 0) {
    try {
      await axios.post("http://localhost:10000/service-discovery", myService);
      console.log("EventBus acknowledged this service");
      break;
    } catch (e) {
      console.log(\`\${attempts} attempts for discovery\`);
      await sleep(800);
      attempts--;
    }
  }

  if (attempts <= 0) {
    console.log("No response from EventBus. Ending service...");
  }
};

startup(10);

app.post('/event', async (req, res) => {
  const { payload, event_type } = req.body;
  const event = events[event_type];
  if (event) {
    try {
      await event(payload);
      res.status(200).end();
    } catch (e) {
      console.log(\`Error handling event: \${event_type}, message: \${e}\`);
      res.status(500).json({ error: \`Error handling event: \${event_type}, message: \${e}\` });
    }
  } else {
    res.status(400).json({ message: 'Unknown event type' });
  }
});

app.listen(PORT, () => console.log(\`RegisterUser service running on port \${PORT}\`));
EOL

# Definindo permissões de execução para o script
chmod +x setup_project.sh
