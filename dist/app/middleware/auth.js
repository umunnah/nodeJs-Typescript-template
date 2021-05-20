"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../../libraries/exceptions");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
// Protect routes
const authorization = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new exceptions_1.UnAuthenticatedException('Not authorize to access this route'));
    }
    try {
        // verify token
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        const id = decoded.id;
        const repo = new user_repository_1.default();
        req.user = await repo.getUser(id);
        next();
    }
    catch (err) {
        return next(new exceptions_1.UnAuthenticatedException('Not authorize to access this route'));
    }
};
exports.default = authorization;
