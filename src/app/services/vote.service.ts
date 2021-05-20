import { Service } from "typedi";
import VoteRepository from "../repository/vote.repository";

@Service()
class VoteService {
	constructor(
		public voteRepository: VoteRepository
	) {
		this.create = this.create.bind(this);
		this.getAnswerVotes = this.getAnswerVotes.bind(this);
		this.getUserVotes = this.getUserVotes.bind(this);
		this.deleteVote = this.deleteVote.bind(this);
	}

	async create(req: any) {
		const { answerId, value } = req.body;
		const userId = req.user.id;
		const data = { value, answerId, userId: userId };
		const result = await this.voteRepository.create(data);
    return result;
	}

	async getAnswerVotes(answerId: number) {
		return await this.voteRepository.getAnswerVotes(answerId);
	}

	async getUserVotes(userId: string) {
		return await this.voteRepository.getUserVotes(userId);
	}

	async deleteVote(req: any) {
		return await this.voteRepository.delete(req.user.id, req.params.id);
	}

}

export default VoteService;
