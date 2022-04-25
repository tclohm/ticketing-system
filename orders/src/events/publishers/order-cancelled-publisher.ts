import { Publisher, OrderCancelledEvent, Subjects } from '@eventspaceticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}