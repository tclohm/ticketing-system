import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// Client to connect (stan is a client)
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222'
});

stan.on('connect', () => {
	console.log('Listener connected to NATS');

	stan.on('close', () => {
		console.log('NATS connection closed!');
		process.exit();
	});

	const options = stan
		.subscriptionOptions()
		.setManualAckMode(true)

	const subscription = stan.subscribe(
		'ticket:created', 
		'orders-service-queue-group',
		options
	);
	subscription.on('message', (msg: Message) => {
		const data = msg.getData();

		if (typeof data === 'string') {
			console.log(`Received event #${msg.getSequence()}, \nwith data: ${data}`)
		}
		// MARK: -- tell the server we have received the message
		msg.ack()
	})
});

process.on('SIGNINT', () => stan.close());
process.on('SIGTERM', () => stan.close());