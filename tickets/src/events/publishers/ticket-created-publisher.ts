import { Publisher, Subjects, TicketCreatedEvent } from '@eventspaceticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}