import { check } from "express-validator";
import { ModelNotFoundException } from "../../libraries/exceptions";
import QuestionRepository from "../repository/question.repository";

const questionRepository = new QuestionRepository();

export default {
	create: [
		check("content").isString().withMessage("Content is required"),

		check("questionId")
			.isNumeric()
			.withMessage("Question Id is required")
			.custom(async (questionId: number) => {
				try {
					await questionRepository.getQuestion(questionId);
          return true;
				} catch (e) {
					throw new ModelNotFoundException("Question", questionId);
				}
			}),
	],

	update: [check("content").isString().withMessage("Content is required")],
};
