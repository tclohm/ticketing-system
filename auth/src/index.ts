import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
const app = express();

const misleadingHeader = (req: Request,res: Response, next: Function) => {
	res.setHeader('x-powered-by', 'Rails');
	next();
}

app.disable('x-powered-by');
app.use(misleadingHeader);
app.use(json()); 

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
	console.log('Listening on port 3000');
})