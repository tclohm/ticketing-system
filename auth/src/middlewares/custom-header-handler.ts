import { Request, Response, NextFunction } from 'express';

export const misleadingHeader = (
	req: Request,
	res: Response, 
	next: NextFunction
) => {
	res.setHeader('x-powered-by', 'Rails');
	next();
}