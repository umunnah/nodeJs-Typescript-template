"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const exceptions_1 = require("../../libraries/exceptions");
const answer_repository_1 = __importDefault(require("../repository/answer.repository"));
const answerRepository = new answer_repository_1.default();
exports.default = {
    create: [
        express_validator_1.check("value")
            .exists()
            .withMessage("Value is Requiered")
            .isIn([-1, 1])
            .withMessage("Value must either be 1 or -1"),
        express_validator_1.check("answerId")
            .isNumeric()
            .withMessage("Answer Id is required")
            .custom(async (answerId) => {
            try {
                await answerRepository.getAnswer(answerId);
                return true;
            }
            catch (e) {
                throw new exceptions_1.ModelNotFoundException("Answer", answerId);
            }
        }),
    ],
    getAnswerVote: [
        express_validator_1.param('answerId')
            .isNumeric()
            .withMessage("Answer Id is required")
            .custom(async (answerId) => {
            try {
                await answerRepository.getAnswer(answerId);
                return true;
            }
            catch (e) {
                throw new exceptions_1.ModelNotFoundException("Answer", answerId);
            }
        }),
    ]
};
