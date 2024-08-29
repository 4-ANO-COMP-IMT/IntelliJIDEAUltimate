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
      console.log(`${attempts} attempts for discovery`);
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
      console.log(`Error handling event: ${event_type}, message: ${e}`);
      res.status(500).json({ error: `Error handling event: ${event_type}, message: ${e}` });
    }
  } else {
    res.status(400).json({ message: 'Unknown event type' });
  }
});

app.listen(PORT, () => console.log(`RegisterUser service running on port ${PORT}`));
