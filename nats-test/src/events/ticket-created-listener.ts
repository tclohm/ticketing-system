import { Listener } from './listener';
import { Message } from 'node-nats-streaming';


export class TicketCreatedListener extends Listener {
	subject = 'ticket:created';
	queueGroupName = 'payments-service';

	// MARK: -- business logic
	onMessage(data: any, msg: Message) {
		console.log('Event data', data);

		msg.ack();
	}
}