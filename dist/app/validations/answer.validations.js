"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const exceptions_1 = require("../../libraries/exceptions");
const question_repository_1 = __importDefault(require("../repository/question.repository"));
const questionRepository = new question_repository_1.default();
exports.default = {
    create: [
        express_validator_1.check("content").isString().withMessage("Content is required"),
        express_validator_1.check("questionId")
            .isNumeric()
            .withMessage("Question Id is required")
            .custom(async (questionId) => {
            try {
                await questionRepository.getQuestion(questionId);
                return true;
            }
            catch (e) {
                throw new exceptions_1.ModelNotFoundException("Question", questionId);
            }
        }),
    ],
    update: [express_validator_1.check("content").isString().withMessage("Content is required")],
};
