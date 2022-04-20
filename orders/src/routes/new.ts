import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, BadRequestError, OrderStatus } from '@eventspaceticketing/common';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

// MARK:
const EXPIRATION_WINDOW_SECONDS = 10 * 60;

router.post('/api/orders', requireAuth,
[
	body('ticketId')
		.not()
		.isEmpty()
		.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
		.withMessage('TicketId must be provided')
], 
validateRequest, 
async (req: Request, res: Response) => {
	const { ticketId } = req.body;

	// Find ticket user is trying to order
	const ticket = await Ticket.findById(ticketId);
	if (!ticket) {
		throw new NotFoundError();
	}

	// Make sure ticket isn't reserved
	const isReserved = await ticket.isReserved();
	if (isReserved) {
		throw new BadRequestError('Ticket is already reserved');
	}

	// Calc expiration date for order
	const expiration = new Date();
	expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

	// Build the order and save it
	const order = Order.build({
		userId: req.currentUser!.id,
		status: OrderStatus.Created,
		expiresAt: expiration,
		ticket: ticket
	});

	await order.save();

	// Publish event -- order created

	res.status(201).send(order);
});

export { router as newOrderRouter };