"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnAuthorizedException extends Error {
    constructor(message) {
        super(message || "Unauthorized");
        this.message = message;
        this.status = 401;
    }
}
exports.default = UnAuthorizedException;
