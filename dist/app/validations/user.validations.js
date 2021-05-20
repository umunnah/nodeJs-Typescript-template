"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const userRepository = new user_repository_1.default();
exports.default = {
    create: [
        express_validator_1.check("email")
            .isString()
            .withMessage("Email is required.")
            .normalizeEmail()
            .isEmail()
            .withMessage("Invalid email format")
            .custom(async (email) => {
            try {
                await userRepository.findByColumn("email", email);
            }
            catch (e) {
                return true;
            }
            throw new Error("Email already exists.");
        }),
        express_validator_1.check("first_name")
            .isString()
            .withMessage("First name is required"),
        express_validator_1.check("last_name")
            .isString()
            .withMessage("Last name is required"),
        express_validator_1.check("password")
            .isString()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password should be greater than 6 characters long."),
    ],
    login: [
        express_validator_1.check("email").
            isString().withMessage("Email is required."),
        express_validator_1.check("password").
            isString().withMessage("Password is required.")
            .isLength({ min: 6 })
            .withMessage("Password should be greater than 6 characters long."),
    ],
};
