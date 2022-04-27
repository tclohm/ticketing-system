import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@eventspaceticketing/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
	// create an instance of the listener
	const listener = new TicketUpdatedListener(natsWrapper.client);

	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'Vertical Leap',
		price: 35
	});

	await ticket.save();

	// create a fake data event
	const data: TicketUpdatedEvent['data'] = {
		version: ticket.version + 1,
		id: ticket.id,
		title: ticket.title,
		price: 15,
		userId: new mongoose.Types.ObjectId().toHexString(),
	};
	// create a fake message object
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	}

	return { listener, data, msg, ticket };
};


it('finds, updates, and saves a ticket', async () => {
	const { listener, data, msg, ticket } = await setup();
	// call the onMessage function with the data object + message object
	await listener.onMessage(data, msg);

	const updated = await Ticket.findById(ticket.id);

	expect(updated!.title).toEqual(data.title);
	expect(updated!.price).toEqual(data.price);
	expect(updated!.version).toEqual(data.version);	
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();
	
	// call the onMessage function with the data object + message object
	await listener.onMessage(data, msg);

	// write assertion to make sure ack function is called
	expect(msg.ack).toHaveBeenCalled();
});

it('acks the message', async () => {
	const { listener, data, msg } = await setup();

	data.version = 20;
	
	try {
		// call the onMessage function with the data object + message object
		await listener.onMessage(data, msg);
	} catch (err) {}

	// write assertion to make sure ack function is not called
	expect(msg.ack).not.toHaveBeenCalled();
});