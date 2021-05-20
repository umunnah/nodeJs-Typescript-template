import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import SubscriptionService from "../services/subscription.service";

@Service()
class SubscriptionController {
	constructor(public subscriptionService: SubscriptionService) {
		this.create = this.create.bind(this);
		this.questionSubscriptions = this.questionSubscriptions.bind(this);
		this.deleteSubscription = this.deleteSubscription.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const subscription = await this.subscriptionService.create(req);
			res.status(201).json({'message':'success', 'data':subscription });
		} catch (e) {
			next(e);
		}
	}

	async questionSubscriptions(req: Request, res: Response, next: NextFunction) {
		try {
			let subscriptions = await this.subscriptionService.getQuestionSubscriptions(parseInt(req.params.questionId));
			res.status(200).json({'message': 'success','data': subscriptions});
		} catch (err) {
			next(err);
		}
	}

	async deleteSubscription(req: Request, res: Response, next: NextFunction) {
		try {
			await this.subscriptionService.deleteSubscription(req);
			res.status(200).json({'message': 'success','data': ""});
		} catch (err) {
			next(err);
		}
	}
}

export default SubscriptionController;
