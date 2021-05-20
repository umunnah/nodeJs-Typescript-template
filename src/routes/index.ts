import * as express from "express";
import { Container } from "typedi";
import FormValidations from "../app/middleware/validation";
import Authorization from "../app/middleware/auth";
import UsersValidations from "../app/validations/user.validations";
import QuestionsValidations from "../app/validations/question.validations";
import AnswerValidations from "../app/validations/answer.validations";
import SubscriptionValidations from "../app/validations/subscription.validations";
import VoteValidations from "../app/validations/vote.validations";
import AuthController from "../app/controllers/auth.controller";
import QuestionController from "../app/controllers/question.controller";
import AnswerController from "../app/controllers/answer.controller";
import SubscriptionController from "../app/controllers/subscription.controller";
import VoteController from "../app/controllers/vote.controller";
import db from "../app/models";

const { User } = db;
declare global {
	namespace Express {
		export interface Request {
			user: typeof User;
		}
	}
}

// register the controller for Dependency Injection using container
const authController = Container.get(AuthController);
const questionController = Container.get(QuestionController);
const answerController = Container.get(AnswerController);
const subscriptionController = Container.get(SubscriptionController);
const voteController = Container.get(VoteController);

let router = express.Router();

// auth controller routes
router.post(
	"/register",
	UsersValidations.create,
	FormValidations,
	authController.create
);
router.post(
	"/login",
	UsersValidations.login,
	FormValidations,
	authController.login
);
router.get("/profile", Authorization, authController.profile);

// all routes for question controller
router.post(
	"/question",
	Authorization,
	QuestionsValidations.create,
	FormValidations,
	questionController.create
);
router.get("/questions", questionController.questions);
router.get("/question/:id", questionController.question);

// all routes for answer controller
router.post(
	"/answer",
	Authorization,
	AnswerValidations.create,
	FormValidations,
	answerController.create
);
router.put(
	"/answer/:id",
	Authorization,
	AnswerValidations.update,
	FormValidations,
	answerController.updateAnswer
);
router.delete("/answer/:id", Authorization, answerController.deleteAnswer);
router.get("/answer/:id", answerController.getAnswer);
router.get("/user/answers", Authorization, answerController.userAnswers);
router.get("/question/:questionId/answers", answerController.questionAnswers);

// suscription routes
router.post(
	"/subscription",
	Authorization,
	SubscriptionValidations.create,
	FormValidations,
	subscriptionController.create
);
router.get(
	"/question/:questionId/subscriptions",
	subscriptionController.questionSubscriptions
);
router.delete(
	"/question/:questionId/subscription",
	Authorization,
	subscriptionController.deleteSubscription
);

// votes routes
router.post("/vote", Authorization, VoteValidations.create, FormValidations,voteController.create);
router.get("/user/votes", Authorization, voteController.userVotes)
router.get("/answer/:answerId/votes", VoteValidations.getAnswerVote, FormValidations,voteController.answerVotes)
router.delete("/vote/:id",Authorization,voteController.deleteVote)

export default router;
