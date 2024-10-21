import * as amqp from 'amqplib';
import { PublisherSingleton } from '@intelij-ultimate/rabbitmq-utility';
import { ImageAllocated } from './interfaces';
import { on_allocation_topic } from './topics';

export class AllocationPublisher extends PublisherSingleton<ImageAllocated> {
    constructor(){
        super(on_allocation_topic);
    }
}

