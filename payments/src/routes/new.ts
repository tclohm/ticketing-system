import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, BadRequestError, NotFoundError } from '@eventspaceticketing/common';
import { Order } from '../models/order';

const router = express.Router();

router.post('/api/payments', 
	requireAuth,
	[
		body('token')
			.not()
			.isEmail(),
		body('orderId')
			.not()
			.isEmail()
	], 
async (req: Request, res: Response) => {
	res.send({ success: true });
});

export { router as createChargeRouter };