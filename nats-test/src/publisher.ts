import nats from 'node-nats-streaming';

console.clear();

// Client to connect (stan is a client)
const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
});

stan.on('connect', () => {
	console.log('Publisher is connected to NATS');

	const data = JSON.stringify({
		id: '2342423',
		title: 'Time flows backwards',
		price: 40
	});
	// MARK: -- data is sometimes called a message or event
	stan.publish('ticket:created', data, () => {
		console.log('Event published')
	});
});