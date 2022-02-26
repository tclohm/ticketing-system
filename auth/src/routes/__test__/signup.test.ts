import request from 'supertest';
import { app } '../../app';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('api/users/signup')
		.send({
			email: 'martymcfly@88.com',
			password: 'outoftime'
		})
		.expect(201);
})