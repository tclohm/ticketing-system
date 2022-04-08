import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';



it('returns a 404 if the tickt is not found', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
	.get(`/api/tickets/${id}`)
	.send()
	.expect(404);
})

it('returns the ticket if the ticket is found', async () => {
	const title = '88 Cool beans';
	const price = 88;
	const response = await request(app)
	.post('/api/tickets')
	.set('Cookie', global.signin())
	.send({
		title, price
	})
	.expect(201);

	const tixResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

	expect(tixResponse.body.title).toEqual(title);
	expect(tixResponse.body.price).toEqual(price);
})