import * as amqp from 'amqplib';
import { createChannel, PublisherSingleton } from '@intelij-ultimate/rabbitmq-utility';

import { ImageAllocation } from './interfaces';
import { on_image_received_topic } from './topics';

export class ImagePublisherSingleton extends PublisherSingleton<ImageAllocation> {
    constructor() {
        super(on_image_received_topic);
    }
}