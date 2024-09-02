
import amqp from 'amqplib';

export interface Consumer{
    queue: string;
    exchange: string;
    consumeFunction: (msg: amqp.ConsumeMessage | null, channel: amqp.Channel) => Promise<void>;
};