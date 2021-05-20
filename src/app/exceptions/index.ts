import { Request,Response, NextFunction } from "express"
import {UnAuthorizedException,
	ValidationException, ModelNotFoundException, UnAuthenticatedException, BadRequestException } from "../../libraries/exceptions";

const errorHandler= (error: Error, req: Request, res: Response, next:NextFunction) => {
	if (
		error instanceof ModelNotFoundException
	) {
		res.status(error.status).json({
			message: error.message,
		});

		return;
	}

	if (error instanceof BadRequestException) {
		res.status(error.status).json({
			message: error.message,
		});

		return;
	}

	if (error instanceof ValidationException) {
		res.status(error.status).json({
			errors: error.errors,
			message: error.message,
		});

		return;
	}

	if (error instanceof UnAuthorizedException) {
		res.status(error.status).json({
			message: error.message,
		});

		return;
	}

	if (error instanceof UnAuthenticatedException) {
		res.status(error.status || 403).json({
			message: error.message,
		});

		return;
	}
	res.status(500).json({
		message: error.message,
		errors: error,
	});
};

export default errorHandler;
