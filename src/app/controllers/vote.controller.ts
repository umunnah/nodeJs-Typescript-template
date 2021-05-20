import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import VoteService from "../services/vote.service";

@Service()
class VoteController {
	constructor(public voteService: VoteService) {
		this.create = this.create.bind(this);
		this.answerVotes = this.answerVotes.bind(this);
    this.userVotes = this.userVotes.bind(this);
    this.deleteVote = this.deleteVote.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const vote = await this.voteService.create(req);
			res.status(201).json({'message':'success', 'data':vote });
		} catch (e) {
			next(e);
		}
	}

	async answerVotes(req: Request, res: Response, next: NextFunction) {
		try {
			let votes = await this.voteService.getAnswerVotes(parseInt(req.params.answerId));
			res.status(200).json({'message': 'success','data': votes});
		} catch (err) {
			next(err);
		}
	}

  async userVotes(req: Request, res: Response, next: NextFunction) {
		try {
			let votes = await this.voteService.getUserVotes(req.user.id);
			res.status(200).json({'message': 'success','data': votes});
		} catch (err) {
			next(err);
		}
	}

  async deleteVote(req: Request, res: Response, next: NextFunction) {
		try {
			await this.voteService.deleteVote(req);
			res.status(200).json({'message': 'success','data': []});
		} catch (err) {
			next(err);
		}
	}
}

export default VoteController;
