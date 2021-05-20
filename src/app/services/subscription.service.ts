import { Service } from "typedi";
import SubscriptionRepository from "../repository/subscription.repository";

@Service()
class SubscriptionService {
	constructor(public subscriptionRepository: SubscriptionRepository) {
		this.create = this.create.bind(this);
		this.getQuestionSubscriptions = this.getQuestionSubscriptions.bind(this);
		this.deleteSubscription = this.deleteSubscription.bind(this);
	}

	async create(req: any) {
		const { questionId } = req.body;
		const userId = req.user.id;
		return await this.subscriptionRepository.create(userId, questionId);
	}

	async getQuestionSubscriptions(questionId: number) {
		const result = await this.subscriptionRepository.getQuestionSubscriptions(
			questionId
		);
		return result.map((data:any) => {
			return data.User;
		});
	}

	async deleteSubscription(req: any) {
		return await this.subscriptionRepository.deleteSubscription(
			parseInt(req.params.questionId),
			req.user.id
		);
	}
}

export default SubscriptionService;
