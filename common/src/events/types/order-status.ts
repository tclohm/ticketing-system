export enum OrderStatus {
	// order created but not reserved
	Created = 'created',
	// order cancelled before or after being reserved
	// or order expired
	Cancelled = 'cancelled',
	// order successfully reserved the ticket
	AwaitingPayment = 'awaiting:payment',
	// order reserved the ticket and user has provided payment successfully
	Complete = 'complete'
}