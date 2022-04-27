import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@eventspaceticketing/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
		// find ticket order is reserving
		const ticket = await Ticket.findById(data.ticket.id);

		// no ticket, throw error 
		if (!ticket) {
			throw new Error('Ticket not found');
		}

		// mark ticket as being reserved by setting its orderId prop
		ticket.set({ orderId: data.id });

		// save ticket
		await ticket.save();

		// ack the message
		msg.ack();
	}
}