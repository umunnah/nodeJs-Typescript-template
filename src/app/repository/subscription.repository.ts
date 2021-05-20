import { Service } from "typedi";
import db from "../models";
import { Op } from "sequelize";
import {
	BadRequestException,
	ModelNotFoundException,
} from "../../libraries/exceptions";

@Service()
class SubscriptionRepository {
	public model: any;
	constructor() {
		this.model = db.Subscription;
	}

	async create(userId: string, questionId: number) {
		try {
			let check = await this.model.findOne({
				where: { [Op.and]: [{ userId: userId, questionId: questionId }] },
			});
			if (check) throw new BadRequestException("Bad Request");
			const subscription = await this.model.create({ userId, questionId });
			return subscription;
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async getQuestionSubscriptions(questionId: number) {
		try {
			const data = await this.model.findAll({
				where: { questionId: questionId },
				include: [this.model.associations.User],
			});
			return data;
		} catch (err) {
			throw new ModelNotFoundException(err, 1);
		}
	}

	async deleteSubscription(questionId: number, userId: string) {
		try {
			const data = await this.getSubscription(questionId, userId);
			const result = await this.model.destroy({
				where: { [Op.and]: [{ userId: userId, questionId: questionId }] },
			});
			return result;
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async getSubscription(questionId: number, userId: string) {
		try {
			const subscription = await this.model.findOne({
				where: { [Op.and]: [{ userId: userId, questionId: questionId }] },
			});
			if (subscription != null) return subscription;
			throw new ModelNotFoundException("Subscription", questionId);
		} catch (err) {
			throw new ModelNotFoundException("Subscription", questionId);
		}
	}
}
 
export default SubscriptionRepository;
