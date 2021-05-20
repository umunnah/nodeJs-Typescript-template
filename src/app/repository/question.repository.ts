import { Service } from "typedi";
import db from "../models";
import { Op } from "sequelize";
import { ModelNotFoundException } from "../../libraries/exceptions";

@Service()
class QuestionRepository {
	public model: any;
	constructor() {
		this.model = db.Question;
	}

	async create(data: any) {
		try {
			const question = await this.model.create(data);
			return question;
		} catch (e) {
			throw new Error(e);
		}
	}

	async getQuestions(req: any) {
		const { page, size, search } = req.query;
		let whereClause: any;
		const newSize = parseInt(size);
		const newPage = parseInt(page);
		const { limit, offset } = this.getPagination(newPage, newSize);
		if (search && search != "") {
			whereClause = {
				[Op.or]: {
					title: { [Op.iLike]: `%${search}%` },
					content: { [Op.iLike]: `%${search}%` },
				},
			};
		}
		try {
			const data = await this.model.findAndCountAll({
				where: whereClause,
				offset: offset,
				limit: limit,
				order: [["createdAt", "DESC"]],
			});
			return this.getPagingData(data, newPage, limit);
		} catch (err) {
			// sqlite3 throws an error when there is no value for such operation
			return [];
			throw new ModelNotFoundException(err, 1);
		}
	}

	async getQuestion(id: string | number) {
		try {
			const question = await this.model.findOne({
				where: { id: id },
				include: [this.model.associations.User],				
			});
			if (question != null) return question;
			throw new ModelNotFoundException("Question", id);
		} catch (err) {
			throw new ModelNotFoundException("Question", id);
		}
	}
	getPagingData(data: any, page: number, limit: number) {
		const { count: totalItems, rows: questions } = data;
		const currentPage = page ? +page : 0;
		const totalPages = Math.ceil(totalItems / limit);

		return { totalItems, questions, totalPages, currentPage };
	}
	getPagination(page: number, size: number) {
		const limit = size ? size : 15;
		const offset = page && page > 1 ? (page - 1) * limit + 1 : 0;

		return { limit, offset };
	}
}

export default QuestionRepository;
