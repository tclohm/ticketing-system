import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { misleadingHeader, errorHandler, NotFoundError } from '@eventspaceticketing/common';
import { createTicketRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);

app.disable('x-powered-by');
app.use(misleadingHeader);
app.use(json()); 

// MARK: -- secure : https
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);

app.use(createTicketRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };