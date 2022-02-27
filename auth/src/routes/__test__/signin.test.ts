import request from 'supertest';
import { app } from '../../app';

it('fails when email that doenst exist is supplied', async () => {
	return request(app)
		.post('/api/users/signin')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(400);
});


it('fails with an incorrect password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);

	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'martymcfly@88.com',
			password: 'outtahere'
		})
		.expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);

	const response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});