import { Service } from "typedi";
import db from "../models";
import {
	ModelNotFoundException,
	UnAuthorizedException,
} from "../../libraries/exceptions";

@Service()
class AnswerRepository {
	public model: any;
	constructor() {
		this.model = db.Answer;
	}

	async create(data: any) {
		try {
			const answer = await this.model.create(data);
			return answer;
		} catch (e) {
			throw new Error(e);
		}
	}

	async getQuestionAnswers(questionId: number) {
		try {
			const data = await this.model.findAndCountAll({
				where: {
					questionId: questionId,
				},
        include: [
					this.model.associations.User,
				],
				order: [["createdAt", "DESC"]],
			});
			return data;
		} catch (err) {
			throw new ModelNotFoundException("Answers", questionId);
		}
	}

	async getUserAnswers(userId: string) {
		try {
			const data = await this.model.findAndCountAll({
				where: {
					userId: userId,
				},
        include: [
					this.model.associations.Question,
				],
				order: [["createdAt", "DESC"]],
			});
			return data;
		} catch (err) {
			throw new ModelNotFoundException("Answers", userId);
		}
	}

	async getAnswer(id: number) {
		try {
			const answer = await this.model.findOne({
				where: { id: id },
				include: [
					this.model.associations.User,
					this.model.associations.Question,
				],
			});
			if (answer != null) return answer;
			throw new ModelNotFoundException("Answer", id);
		} catch (err) {
			throw new ModelNotFoundException("Answer", id);
		}
	}

	async updateAnswer(userId: string, content: string, id: number) {
		try {
			const answer = await this.getAnswer(id);
			if (answer.userId !== userId) {
				throw new UnAuthorizedException("Not Authorized to perform action");
			}
			const update = await this.model.update(
				{ content },
				{ where: { id: id } }
			);
			return update;
		} catch (err) {
			if (err instanceof UnAuthorizedException) {
				throw new UnAuthorizedException(err.message);
			}
			throw new ModelNotFoundException("Answer", id);
		}
	}

	async delete(userId: string, id: number) {
		try {
			const answer = await this.getAnswer(id);
			if (answer.userId != userId)
				throw new UnAuthorizedException("Not Authorized to perform action");
			await this.model.destroy({ where: { id: id } });
			return "";
		} catch (err) {
			if (err instanceof UnAuthorizedException) {
				throw new UnAuthorizedException(err.message);
			}
			throw new ModelNotFoundException("Answer", id);
		}
	}
}

export default AnswerRepository;
