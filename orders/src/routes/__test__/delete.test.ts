import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

import { natsWrapper } from '../../nats-wrapper';

it('marks an order as cancelled', async () => {
	// create a ticket
	const ticket = Ticket.build({ 
		id: new mongoose.Types.ObjectId().toHexString(), 
		title: 'cool beans', 
		price: 50 
	});
	await ticket.save();
	const user = global.signin();
	
	// make a req to create an order
	const { body: order } = await request(app)
		.post('/api/orders')
		.set('Cookie', user)
		.send({ ticketId: ticket.id })
		.expect(201)

	// make a req to cancel the order
	const response = await request(app)
		.delete(`/api/orders/${order.id}`)
		.set('Cookie', user)
		.send()
		.expect(204);

	// expectation to make sure the thing is cancelled
	const updated = await Order.findById(order.id);

	expect(updated!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
	const ticket = Ticket.build({ 
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'cool beans', 
		price: 50 });
	await ticket.save();
	const user = global.signin();
	
	// make a req to create an order
	const { body: order } = await request(app)
		.post('/api/orders')
		.set('Cookie', user)
		.send({ ticketId: ticket.id })
		.expect(201)

	// make a req to cancel the order
	const response = await request(app)
		.delete(`/api/orders/${order.id}`)
		.set('Cookie', user)
		.send()
		.expect(204);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});