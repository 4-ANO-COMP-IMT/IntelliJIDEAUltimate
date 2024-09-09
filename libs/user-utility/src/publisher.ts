import * as amqp from 'amqplib';
import { PublisherSingleton } from '@intelij-ultimate/rabbitmq-utility';
import { User } from './interfaces';
import { on_registration_topic } from './topics';

export class RegistrationPublisher extends PublisherSingleton<User> {
    constructor(){
        super(on_registration_topic);
    }
}
