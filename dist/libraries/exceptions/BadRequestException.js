"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequestException extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 400;
    }
}
exports.default = BadRequestException;
