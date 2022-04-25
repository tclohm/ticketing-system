import { Publisher, OrderCreatedEvent, Subjects } from '@eventspaceticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}