import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@eventspaceticketing/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
	queueGroupName = queueGroupName

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		// find ticket
		const ticket = await Ticket.findById(data.ticket.id);
		if (!ticket) {
			throw new Error('Ticket not found');
		}
		// unset orderId property
		ticket.set({ orderId: undefined });
		// save ticket
		await ticket.save();
		// publish event
		await new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			version: ticket.version,
			title: ticket.title,
			price: ticket.price,
			userId: ticket.userId,
			orderId: ticket.orderId
		});

		// ack message
		msg.ack();
	}
}