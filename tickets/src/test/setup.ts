import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
	var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = 'doc!';
	mongo = await MongoMemoryServer.create();
	const mongoURI = await mongo.getUri();

	await mongoose.connect(mongoURI);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({})
	}
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

global.signin = () => {
	// Build a JWT payload { id, email }
	const payload = {
		id: 'outtatime123',
		email: 'coolmarty@88.com'
	};

	// create JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build session Object { jwt: ### }
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// return string that cookie with the encoded data
	return [`express:sess=${base64}`];

}