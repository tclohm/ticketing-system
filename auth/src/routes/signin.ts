import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import Password from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
	[
		body('email')
			.isEmail()
			.withMessage('Email must be valid'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('Please provide a password')

	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existing = await User.findOne({ email });

		if (!existing) {
			throw new BadRequestError('Creds failed');
		}

		const matched = await Password.compare(existing.password, password);

		if (!matched) {
			throw new BadRequestError('Creds failed');
		}

		// MARK: -- generate jwt
		const userJWT = jwt.sign(
		{
			id: existing.id,
			email: existing.email
		}, 
		process.env.JWT_KEY!
		);

		// MARK: -- store on session object
		req.session = {
			jwt: userJWT
		};

		res.status(200).send(existing);
	}
);

export{ router as signinRouter };