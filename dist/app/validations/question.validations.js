"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    create: [
        express_validator_1.check("title")
            .isString()
            .withMessage("Question Title is required"),
        express_validator_1.check("content")
            .isString()
            .withMessage("Content is required"),
    ],
    update: [
        express_validator_1.check("title")
            .isString()
            .withMessage("Question Title is required"),
        express_validator_1.check("content")
            .isString()
            .withMessage("Content is required"),
    ],
};
