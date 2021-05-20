"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const exceptions_1 = require("../../libraries/exceptions");
exports.default = (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return `request ${location}[${param}]: ${msg}`;
    };
    const errors = express_validator_1.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        throw new exceptions_1.ValidationException(errors.mapped());
    }
    next();
};
