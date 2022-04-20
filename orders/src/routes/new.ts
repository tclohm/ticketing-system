import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, BadRequestError, OrderStatus } from '@eventspaceticketing/common';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router()

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
	const existingOrder = await Order.findOne({
		ticket: ticket,
		status: {
			$in: [
				OrderStatus.Created,
				OrderStatus.AwaitingPayment,
				OrderStatus.Complete
			]
		}
	});

	if (existingOrder) {
		throw new BadRequestError('Ticket is already reserved');
	}

	// Build the order and save it

	// Publish event -- order created
	res.send({})
});

export { router as newOrderRouter };