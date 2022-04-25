import { Publisher, OrderCancelledEvent, Subjects } from '@eventspaceticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}