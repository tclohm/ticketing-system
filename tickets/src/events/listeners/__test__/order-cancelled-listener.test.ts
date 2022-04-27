import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@eventspaceticketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
	const listener = new OrderCancelledListener(natsWrapper.client);

	const orderId = new mongoose.Types.ObjectId().toHexString();

	const ticket = Ticket.build({
		title: 'Harry\'s Barshop Quartet',
		price: 10,
		userId: 'unqiue12312419',
	});

	ticket.set({ orderId });
	await ticket.save();

	const data: OrderCancelledEvent['data'] = {
		id: orderId,
		version: 0,
		ticket: {
			id: ticket.id
		}
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { msg, data, ticket, orderId, listener };
};