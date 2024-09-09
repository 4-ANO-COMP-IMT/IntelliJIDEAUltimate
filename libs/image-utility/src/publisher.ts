import * as amqp from 'amqplib';
import { createChannel, PublisherSingleton } from '@intelij-ultimate/rabbitmq-utility';

import { Image } from './interfaces';
import { on_image_received_topic } from './topics';

export class ImagePublisherSingleton extends PublisherSingleton<Image> {
    constructor() {
        super(on_image_received_topic);
    }
}


/**
 * 
 * 

export class LoginPublisherSingleton extends PublisherSingleton<Session> {
    constructor() {
        super(on_login_topic);
    }
}

export class LogoutPublisherSingleton extends PublisherSingleton<Session> {
    constructor() {
        super(on_logout_topic);
    }
}

 * 
 * 
 */