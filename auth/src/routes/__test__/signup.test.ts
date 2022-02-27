import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);
});

it('returns a 400 with an invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly88.com',
			password: 'outoftime'
		})
		.expect(400);
});

it('returns a 400 with an invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly88.com',
			password: 'o'
		})
		.expect(400);
});

it('returns a 400 with missing email and password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({})
		.expect(400);
});

it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(400);
});

it('sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
})