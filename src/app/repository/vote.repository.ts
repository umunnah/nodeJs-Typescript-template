import { Service } from "typedi";
import db from "../models";
import { Op } from "sequelize";
import {
	ModelNotFoundException,
	UnAuthorizedException,
} from "../../libraries/exceptions";

@Service()
class VoteRepository {
	public model: any;
  public like:number = 0;
  public dislike:number = 0;
	constructor() {
		this.model = db.Vote;
	}

	async create(data: any) {
		try {
      const vote = await this.model.findOne({
        where: {
          [Op.and]: {
            answerId: data.answerId,
            userId: data.userId,
            value: data.value
          }
        }
      })
      if (vote != null && vote.value == data.value) {
        return vote;
      } else {
        const result = await this.model.create(data);
        return result;
      }
		} catch (e) {
			throw new Error(e);
		}
	}

	async getAnswerVotes(answerId: number) {
		try {
			this.dislike = await this.model.count({
				where: {
					answerId: answerId,
          value: -1
				},
			});
      this.like = await this.model.count({
				where: {
					answerId: answerId,
          value: 1
				},
			});
			return {'up': this.like,'down':this.dislike};
		} catch (err) {
			throw new ModelNotFoundException("Votes", answerId);
		}
	}

	async getUserVotes(userId: string) {
		try {
			this.dislike = await this.model.count({
				where: {
					userId: userId,
          value: -1
				},
			});
      this.like = await this.model.count({
				where: {
					userId: userId,
          value: 1
				},
			});
			return {'up': this.like,'down':this.dislike};
		} catch (err) {
			throw new ModelNotFoundException(err, userId);
		}
	}

	async getVote(id: number) {
		try {
			const vote = await this.model.findOne({
				where: { id: id }
			});
			if (vote != null) return vote;
			throw new ModelNotFoundException("Vote", id);
		} catch (err) {
			throw new ModelNotFoundException("Vote", id);
		}
	}


	async delete(userId: string, id: number) {
		try {
			const vote = await this.getVote(id);
			if (vote.userId != userId)
				throw new UnAuthorizedException("Not Authorized to perform action");
			await this.model.destroy({ where: { id: id } });
			return "";
		} catch (err) {
			if (err instanceof UnAuthorizedException) {
				throw new UnAuthorizedException(err.message);
			}
			throw new ModelNotFoundException("Vote", id);
		}
	}
}

export default VoteRepository;
