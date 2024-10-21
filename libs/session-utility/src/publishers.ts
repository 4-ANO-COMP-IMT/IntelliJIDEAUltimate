import { PublisherSingleton } from '@intelij-ultimate/rabbitmq-utility';
import { Session } from './interfaces';
import { on_login_topic,on_logout_topic } from './topics';


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
