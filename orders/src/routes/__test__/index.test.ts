import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async (title: string, price: number) => {
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: title,
		price: price
	});

	await ticket.save();

	return ticket;
}

it('fetches orders for a particular user', async () => {
	// create three tickets
	const ticketOne = await buildTicket('Hello world', 20);
	const ticketTwo = await buildTicket('Oh Joy', 40);
	const ticketThree = await buildTicket('People person', 4);

	const userOne = global.signin();
	const userTwo = global.signin();

	// create one order as user #1
	await request(app)
		.post('/api/orders')
		.set('Cookie', userOne)
		.send({ ticketId: ticketOne.id })
		.expect(201);

	// create two order as user #2
	const { body: orderOne } = await request(app)
		.post('/api/orders')
		.set('Cookie', userTwo)
		.send({ ticketId: ticketTwo.id })
		.expect(201);

	// request orders for user #2
	const { body: orderTwo } = await request(app)
		.post('/api/orders')
		.set('Cookie', userTwo)
		.send({ ticketId: ticketThree.id })
		.expect(201);

	// make sure we get the orders for user #2
	const response = await request(app)
		.get('/api/orders')
		.set('Cookie', userTwo)
		.expect(200);

	expect(response.body.length).toEqual(2)

	expect(response.body[0].id).toEqual(orderOne.id)
	expect(response.body[1].id).toEqual(orderTwo.id)
	expect(response.body[0].ticket.id).toEqual(ticketTwo.id)
	expect(response.body[1].ticket.id).toEqual(ticketThree.id)
});