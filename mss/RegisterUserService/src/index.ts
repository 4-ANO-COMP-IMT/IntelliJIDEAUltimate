import express from 'express';
import cors from 'cors';
// import routes from './routes';
import { PORT } from './config/env';
// import { errorHandler } from './middlewares/errorHandler';
import { ConsumerSingleton, PublisherSingleton, connectToRabbitMQ} from '@intelij-ultimate/rabbitmq-utility';
import { LoginConsumerSingleton } from '@intelij-ultimate/session-utility';
import { RegistrationPublisher } from '@intelij-ultimate/user-utility';
import { User, NewUser, getUserByUsername, createUser} from '@intelij-ultimate/user-utility';
import { authMiddleware, adminMiddleware } from '@intelij-ultimate/middleware-utility';
const app = express();

app.use(express.json());
app.use(cors());
app.use(adminMiddleware);
app.post('/register', async (req, res): Promise<void> => {
    const { new_username, new_password, is_admin } = req.body;
    console.log('Registering user...');
    //console.log(`Username: ${new_username}`);
    //console.log(`Password: ${new_password}`);

    const newUser: NewUser = new NewUser(new_username, new_password, is_admin);

    let user = await getUserByUsername(newUser.getUsername());
    if (user) {
        res.status(400).json({ message: 'Username already exists' });
        return;
    }
    user = await createUser(newUser.getUsername(), newUser.getPassword(), newUser.getIsAdmin());
    console.log(`User registered: ${user.username} with id: ${user.user_id}`);

    const registrationPublisher = await RegistrationPublisher.getInstance();
    await registrationPublisher.publish(user);
    
    res.status(200).json({ message: 'User registered' });
});
// app.use('/api', routes);
// app.use(errorHandler);

const startServer = async() => {
    console.log('wait 3 seconds before starting up ...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('starting up');

    await connectToRabbitMQ();

    await RegistrationPublisher.getInstance();
   
    await LoginConsumerSingleton.createInstance("register-service");

    await ConsumerSingleton.startAllConsumers();


    app.listen(PORT, () => console.log(`RegisterUser service running on port ${PORT}`));
}


startServer();
