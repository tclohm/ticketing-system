import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { misleadingHeader, errorHandler, NotFoundError, currentUser } from '@eventspaceticketing/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

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

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };