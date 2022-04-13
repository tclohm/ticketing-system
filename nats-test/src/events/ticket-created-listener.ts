import { Listener } from './listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
	queueGroupName = 'payments-service';

	// MARK: -- business logic
	onMessage(data: any, msg: Message) {
		console.log('Event data', data);

		console.log(data.name);
		console.log(data.cost);

		msg.ack();
	}
}