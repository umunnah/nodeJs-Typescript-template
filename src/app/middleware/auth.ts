import { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthenticatedException } from '../../libraries/exceptions';
import UserRepository from '../repository/user.repository'

// Protect routes
const authorization = async (req: Request, res: Response, next: NextFunction) => {
	let token; 

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} 
	if (!token) {
		return next(new UnAuthenticatedException('Not authorize to access this route'));
	}

	try {
		// verify token
		const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`);
    const id = (<any>decoded).id;
    const repo = new UserRepository();
		req.user = await repo.getUser(id);
		next();
	} catch (err) {
		return next(new UnAuthenticatedException('Not authorize to access this route'));
	}
};

export default authorization;