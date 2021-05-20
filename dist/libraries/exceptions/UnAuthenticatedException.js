"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnAuthenticatedException extends Error {
    constructor(message) {
        super(message || "Unauthenticated");
        this.message = message;
        this.status = 403;
    }
}
exports.default = UnAuthenticatedException;
