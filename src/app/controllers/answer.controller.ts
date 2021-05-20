import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import AnswerService from "../services/answer.service";

@Service()
class AnswerController {
	constructor(public answerService: AnswerService) {
		this.create = this.create.bind(this);
		this.questionAnswers = this.questionAnswers.bind(this);
    this.userAnswers = this.userAnswers.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const answer = await this.answerService.create(req);
			res.status(201).json({'message':'success', 'data':answer });
		} catch (e) {
			next(e);
		}
	}

	async questionAnswers(req: Request, res: Response, next: NextFunction) {
		try {
			let answers = await this.answerService.getQuestionAnswers(parseInt(req.params.questionId));
			res.status(200).json({'message': 'success','data': answers});
		} catch (err) {
			next(err);
		}
	}

	async userAnswers(req: Request, res: Response, next: NextFunction) {
		try {
      const {id} = req.user;
			let answer = await this.answerService.getUserAnswers(id);
			res.status(200).json({'message': 'success','data': answer});
		} catch (err) {
			next(err);
		}
	}

  async getAnswer(req: Request, res: Response, next: NextFunction) {
		try {
			let answer = await this.answerService.getAnswer(parseInt(req.params.id));
			res.status(200).json({'message': 'success','data': answer});
		} catch (err) {
			next(err);
		}
	}


  async updateAnswer(req: Request, res: Response, next: NextFunction) {
		try {
			await this.answerService.updateAnswer(req);
			res.status(200).json({'message': 'success','data': []});
		} catch (err) {
			next(err);
		}
	}

  async deleteAnswer(req: Request, res: Response, next: NextFunction) {
		try {
			await this.answerService.deleteAnswer(req);
			res.status(200).json({'message': 'success','data': []});
		} catch (err) {
			next(err);
		}
	}
}

export default AnswerController;
