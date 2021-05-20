import { check, param} from "express-validator";
import { ModelNotFoundException } from "../../libraries/exceptions";
import AnswerRepository from "../repository/answer.repository";

const answerRepository = new AnswerRepository();

export default {
	create: [
		check("value")
			.exists()
			.withMessage("Value is Requiered")
			.isIn([-1, 1])
			.withMessage("Value must either be 1 or -1"),

		check("answerId")
			.isNumeric()
			.withMessage("Answer Id is required")
			.custom(async (answerId: number) => {
				try {
					await answerRepository.getAnswer(answerId);
					return true;
				} catch (e) {
					throw new ModelNotFoundException("Answer", answerId);
				}
			}),
	],
	getAnswerVote: [
		param('answerId')
		.isNumeric()
		.withMessage("Answer Id is required")
		.custom(async (answerId: number) => {
			try {
				await answerRepository.getAnswer(answerId);
				return true;
			} catch (e) {
				throw new ModelNotFoundException("Answer", answerId);
			}
		}),
	]
};
