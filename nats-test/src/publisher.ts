import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

// Client to connect (stan is a client)
const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
});

stan.on('connect', async () => {
	console.log('Publisher is connected to NATS');

	const publisher = new TicketCreatedPublisher(stan);
	try {
		await publisher.publish({
				id: "123",
				title: "hello world",
				price: 40
		});
	} catch (e) {
		console.error(e)
	}
	
	// const data = JSON.stringify({
	// 	id: '2342423',
	// 	title: 'Time flows backwards',
	// 	price: 40
	// });
	// // MARK: -- data is sometimes called a message or event
	// stan.publish('ticket:created', data, () => {
	// 	console.log('Event published')
	// });
});