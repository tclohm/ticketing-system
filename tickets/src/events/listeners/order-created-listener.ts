import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@eventspaceticketing/common';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListner extends Listener<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

	}
}