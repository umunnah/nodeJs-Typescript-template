"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const exceptions_1 = require("../../libraries/exceptions");
let QuestionRepository = class QuestionRepository {
    constructor() {
        this.model = models_1.default.Question;
    }
    async create(data) {
        try {
            const question = await this.model.create(data);
            return question;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getQuestions(req) {
        const { page, size, search } = req.query;
        let whereClause;
        const newSize = parseInt(size);
        const newPage = parseInt(page);
        const { limit, offset } = this.getPagination(newPage, newSize);
        if (search && search != "") {
            whereClause = {
                [sequelize_1.Op.or]: {
                    title: { [sequelize_1.Op.iLike]: `%${search}%` },
                    content: { [sequelize_1.Op.iLike]: `%${search}%` },
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
        }
        catch (err) {
            // sqlite3 throws an error when there is no value for such operation
            return [];
            throw new exceptions_1.ModelNotFoundException(err, 1);
        }
    }
    async getQuestion(id) {
        try {
            const question = await this.model.findOne({
                where: { id: id },
                include: [this.model.associations.User],
            });
            if (question != null)
                return question;
            throw new exceptions_1.ModelNotFoundException("Question", id);
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Question", id);
        }
    }
    getPagingData(data, page, limit) {
        const { count: totalItems, rows: questions } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, questions, totalPages, currentPage };
    }
    getPagination(page, size) {
        const limit = size ? size : 15;
        const offset = page && page > 1 ? (page - 1) * limit + 1 : 0;
        return { limit, offset };
    }
};
QuestionRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], QuestionRepository);
exports.default = QuestionRepository;
