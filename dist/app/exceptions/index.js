"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../libraries/exceptions");
const errorHandler = (error, req, res, next) => {
    if (error instanceof exceptions_1.ModelNotFoundException) {
        res.status(error.status).json({
            message: error.message,
        });
        return;
    }
    if (error instanceof exceptions_1.BadRequestException) {
        res.status(error.status).json({
            message: error.message,
        });
        return;
    }
    if (error instanceof exceptions_1.ValidationException) {
        res.status(error.status).json({
            errors: error.errors,
            message: error.message,
        });
        return;
    }
    if (error instanceof exceptions_1.UnAuthorizedException) {
        res.status(error.status).json({
            message: error.message,
        });
        return;
    }
    if (error instanceof exceptions_1.UnAuthenticatedException) {
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
exports.default = errorHandler;
