import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import QuestionService from "../services/question.service";

@Service()
class QuestionController {
	constructor(public questionService: QuestionService) {
		this.create = this.create.bind(this);
		this.questions = this.questions.bind(this);
		this.question = this.question.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const question = await this.questionService.create(req);
			res.status(201).json({'message':'success', 'data':question });
		} catch (e) {
			next(e);
		}
	}

	async questions(req: Request, res: Response, next: NextFunction) {
		try {
			let questions = await this.questionService.getQuestions(req);
			res.status(200).json({'message': 'success','data': questions});
		} catch (err) {
			next(err);
		}
	}

	async question(req: Request, res: Response, next: NextFunction) {
		try {
      const {id} = req.params;
			let question = await this.questionService.getQuestion(id);
			res.status(200).json({'message': 'success','data': question});
		} catch (err) {
			next(err);
		}
	}
}

export default QuestionController;
