"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const typedi_1 = require("typedi");
const validation_1 = __importDefault(require("../app/middleware/validation"));
const auth_1 = __importDefault(require("../app/middleware/auth"));
const user_validations_1 = __importDefault(require("../app/validations/user.validations"));
const question_validations_1 = __importDefault(require("../app/validations/question.validations"));
const answer_validations_1 = __importDefault(require("../app/validations/answer.validations"));
const subscription_validations_1 = __importDefault(require("../app/validations/subscription.validations"));
const vote_validations_1 = __importDefault(require("../app/validations/vote.validations"));
const auth_controller_1 = __importDefault(require("../app/controllers/auth.controller"));
const question_controller_1 = __importDefault(require("../app/controllers/question.controller"));
const answer_controller_1 = __importDefault(require("../app/controllers/answer.controller"));
const subscription_controller_1 = __importDefault(require("../app/controllers/subscription.controller"));
const vote_controller_1 = __importDefault(require("../app/controllers/vote.controller"));
const models_1 = __importDefault(require("../app/models"));
const { User } = models_1.default;
// register the controller for Dependency Injection using container
const authController = typedi_1.Container.get(auth_controller_1.default);
const questionController = typedi_1.Container.get(question_controller_1.default);
const answerController = typedi_1.Container.get(answer_controller_1.default);
const subscriptionController = typedi_1.Container.get(subscription_controller_1.default);
const voteController = typedi_1.Container.get(vote_controller_1.default);
let router = express.Router();
// auth controller routes
router.post("/register", user_validations_1.default.create, validation_1.default, authController.create);
router.post("/login", user_validations_1.default.login, validation_1.default, authController.login);
router.get("/profile", auth_1.default, authController.profile);
// all routes for question controller
router.post("/question", auth_1.default, question_validations_1.default.create, validation_1.default, questionController.create);
router.get("/questions", questionController.questions);
router.get("/question/:id", questionController.question);
// all routes for answer controller
router.post("/answer", auth_1.default, answer_validations_1.default.create, validation_1.default, answerController.create);
router.put("/answer/:id", auth_1.default, answer_validations_1.default.update, validation_1.default, answerController.updateAnswer);
router.delete("/answer/:id", auth_1.default, answerController.deleteAnswer);
router.get("/answer/:id", answerController.getAnswer);
router.get("/user/answers", auth_1.default, answerController.userAnswers);
router.get("/question/:questionId/answers", answerController.questionAnswers);
// suscription routes
router.post("/subscription", auth_1.default, subscription_validations_1.default.create, validation_1.default, subscriptionController.create);
router.get("/question/:questionId/subscriptions", subscriptionController.questionSubscriptions);
router.delete("/question/:questionId/subscription", auth_1.default, subscriptionController.deleteSubscription);
// votes routes
router.post("/vote", auth_1.default, vote_validations_1.default.create, validation_1.default, voteController.create);
router.get("/user/votes", auth_1.default, voteController.userVotes);
router.get("/answer/:answerId/votes", vote_validations_1.default.getAnswerVote, validation_1.default, voteController.answerVotes);
router.delete("/vote/:id", auth_1.default, voteController.deleteVote);
exports.default = router;
