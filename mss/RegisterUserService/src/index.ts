import express from 'express';
import cors from 'cors';
// import routes from './routes';
import { PORT } from './config/env';
// import { errorHandler } from './middlewares/errorHandler';
import {Consumer,connectToRabbitMQ,startConsuming, } from '@intelij-ultimate/rabbitmq-utility';
import { LoginConsumer } from '@intelij-ultimate/session-utility';
import {ResgistrationPublisherSingleton} from '@intelij-ultimate/user-utility';
import { User, NewUser, getUserByUsername, createUser} from '@intelij-ultimate/user-utility';
import { authMiddleware, adminMiddleware } from '@intelij-ultimate/middleware-utility';
const app = express();

app.use(express.json());
app.use(cors());
app.use(adminMiddleware);
app.post('/register', async (req, res) => {
    const { new_username, new_password } = req.body;
    console.log('Registering user...');
    console.log(`Username: ${new_username}`);
    console.log(`Password: ${new_password}`);

    const newUser: NewUser = new NewUser(new_username, new_password);

    let user = await getUserByUsername(newUser.getUsername())
    if (user) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    user = await createUser(newUser.getUsername(), newUser.getPassword(), newUser.getIsAdmin());
    console.log(`User registered: ${user.username} with id: ${user.user_id}`);

    await ResgistrationPublisherSingleton.getInstance().publish(user);
    
    res.status(200).json({ message: 'User registered' });
});
// app.use('/api', routes);
// app.use(errorHandler);

const startUp = async() => {
    console.log('wait 10 seconds before starting up ...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('starting up');

    let connection = await connectToRabbitMQ();
    await ResgistrationPublisherSingleton.getInstance().start();


    let consumers: Consumer[] = [
        LoginConsumer.getInstance()
    ];
    startConsuming(connection, consumers);

    app.listen(PORT, () => console.log(`RegisterUser service running on port ${PORT}`));
}


startUp();


// const myService = {
//   service_name: "RegisterUserService",
//   host: "localhost",
//   port: PORT,
// };

// const startup = async (attempts: number) => {
//   while (attempts > 0) {
//     try {
//       await axios.post("http://localhost:10000/service-discovery", myService);
//       console.log("EventBus acknowledged this service");
//       break;
//     } catch (e) {
//       console.log(`${attempts} attempts for discovery`);
//       await sleep(800);
//       attempts--;
//     }
//   }

//   if (attempts <= 0) {
//     console.log("No response from EventBus. Ending service...");
//   }
// };

// startup(10);

// app.post('/event', async (req, res) => {
//   const { payload, event_type } = req.body;
//   const event = events[event_type];
//   if (event) {
//     try {
//       await event(payload);
//       res.status(200).end();
//     } catch (e) {
//       console.log(`Error handling event: ${event_type}, message: ${e}`);
//       res.status(500).json({ error: `Error handling event: ${event_type}, message: ${e}` });
//     }
//   } else {
//     res.status(400).json({ message: 'Unknown event type' });
//   }
// });

