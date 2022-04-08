import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the tickt is not found', async () => {
	await request(app)
	.get('/api/tickets/asdkaldjalkdj')
	.send()
	.expect(404);
})

it('returns the ticket if the ticket is found', async () => {
	const title = '88 Cool beans';
	const price = 88;
	const response = await request(app)
	.get('/api/tickets')
	.set('Cookie', global.signin())
	.send({
		title, price
	})
	.expect(201);

	const tixResponse = await(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

	expect(tixResponse.body.title).toEqual(title);
	expect(tixResponse.body.price).toEqual(price);
})