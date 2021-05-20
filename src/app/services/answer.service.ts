import { Service } from "typedi";
import AnswerRepository from "../repository/answer.repository";
import SubscriptionService from "./subscription.service";
import QuestionService from "./question.service";
import Mailer from './mail.service'

@Service()
class AnswerService {
	constructor(
		public answerRepository: AnswerRepository,
		public subscriptionService: SubscriptionService,
		public questionService: QuestionService,
    public mailer: Mailer
	) {
		this.create = this.create.bind(this);
		this.getQuestionAnswers = this.getQuestionAnswers.bind(this);
		this.getUserAnswers = this.getUserAnswers.bind(this);
		this.getAnswer = this.getAnswer.bind(this);
		this.updateAnswer = this.updateAnswer.bind(this);
		this.deleteAnswer = this.deleteAnswer.bind(this);
	}

	async create(req: any) {
		const { questionId, content } = req.body;
		const userId = req.user.id;
		const data = { content, questionId, userId: userId };
		const result = await this.answerRepository.create(data);
    await this.sendMail(questionId);
    return result;
	}

	async getQuestionAnswers(questionId: number) {
		await this.questionService.getQuestion(questionId);
		return await this.answerRepository.getQuestionAnswers(questionId);
	}

	async getUserAnswers(userId: string) {
		return await this.answerRepository.getUserAnswers(userId);
	}

	async getAnswer(id: number) {
		return await this.answerRepository.getAnswer(id);
	}

	async updateAnswer(req: any) {
		return await this.answerRepository.updateAnswer(
			req.user.id,
			req.body.content,
			req.params.id
		);
	}

	async deleteAnswer(req: any) {
		return await this.answerRepository.delete(req.user.id, req.params.id);
	}

  async sendMail(questionId: number) {
    const questionSubscribers = await this.subscriptionService.getQuestionSubscriptions(questionId);
    if (questionSubscribers.length > 0) {
      let num:number = 0;
      for(num;num < questionSubscribers.length; num++) {
        const subscribers = questionSubscribers[num];
        const msg = `Question with id: ${questionId} has been answer`;
        await this.mailer.sendMail(subscribers.email,"Subscription Notification",msg);
     }
    }
  }
}

export default AnswerService;
