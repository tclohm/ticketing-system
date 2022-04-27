import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { OrderCreatedEvent, OrderStatus } from '@eventspaceticketing/common';

const setup = async () => {
	// create instance of listener
	const listener = new OrderCreatedListener(natsWrapper.client);

	// create and save ticket
	const ticket = Ticket.build({
		title: 'Marty and Doc: Flying through time',
		price: 10000,
		userId: 'mongoose#arbvalue'
	});

	await ticket.save();

	// create fake data event
	const data: OrderCreatedEvent['data'] = {
		id: new mongoose.Types.ObjectId().toHexString(),
		version: 0,
		status: OrderStatus.Created,
		userId: ticket.userId,
		expiresAt: '40129312',
		ticket: {
			id: ticket.id,
			price: ticket.price
		}

	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { listener, ticket, data, msg };
};


it('sets the orderId of the ticket', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const updated = await Ticket.findById(ticket.id);

	expect(updated!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled()
});


it('publishes a ticket updated event', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(natsWrapper.client.publish).toHaveBeenCalled();

	const updatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

	expect(data.id).toEqual(updatedData.orderId);
})