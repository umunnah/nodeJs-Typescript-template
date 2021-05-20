"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationException extends Error {
    constructor(errors) {
        super("Validation errors.");
        this.errors = errors;
        this.status = 422;
        this.errors = errors;
    }
}
exports.default = ValidationException;
