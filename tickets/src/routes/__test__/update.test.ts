import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';

it('returns a 404 if the provided id does not exist', async function() {
	const id = new mongoose.Types.ObjectId().toHexString()
	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', global.signin())
		.send({
			title: 'blah',
			price: 20
		})
		.expect(404)

});

it('returns a 401 if user is not authenticated', async function() {
	const id = new mongoose.Types.ObjectId().toHexString()
	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'blah',
			price: 20
		})
		.expect(401)
});

it('returns a 401 if the user does not own the ticket', async function() {
	const cookie1 = global.signin()
	const cookie2 = global.signin()

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie1)
		.send({
			title: 'blah',
			price: 20
		})

	const id = response.body.id;
		
	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', cookie2)
		.send({
			title: 'blah1',
			price: 1
		})
		.expect(401)
		
		
});

it('returns a 400 if the user provides an invalid title or price', async function() {
	const cookie = global.signin()
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'blah',
			price: 20
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 20
		})
		.expect(400)
	

	const p = await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'cool',
			price: -10
		}).expect(400)

});

it('it updates the ticket provided valid inputs', async () => {
	
})