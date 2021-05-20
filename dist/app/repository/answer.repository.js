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
const exceptions_1 = require("../../libraries/exceptions");
let AnswerRepository = class AnswerRepository {
    constructor() {
        this.model = models_1.default.Answer;
    }
    async create(data) {
        try {
            const answer = await this.model.create(data);
            return answer;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getQuestionAnswers(questionId) {
        try {
            const data = await this.model.findAndCountAll({
                where: {
                    questionId: questionId,
                },
                include: [
                    this.model.associations.User,
                ],
                order: [["createdAt", "DESC"]],
            });
            return data;
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Answers", questionId);
        }
    }
    async getUserAnswers(userId) {
        try {
            const data = await this.model.findAndCountAll({
                where: {
                    userId: userId,
                },
                include: [
                    this.model.associations.Question,
                ],
                order: [["createdAt", "DESC"]],
            });
            return data;
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Answers", userId);
        }
    }
    async getAnswer(id) {
        try {
            const answer = await this.model.findOne({
                where: { id: id },
                include: [
                    this.model.associations.User,
                    this.model.associations.Question,
                ],
            });
            if (answer != null)
                return answer;
            throw new exceptions_1.ModelNotFoundException("Answer", id);
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Answer", id);
        }
    }
    async updateAnswer(userId, content, id) {
        try {
            const answer = await this.getAnswer(id);
            if (answer.userId !== userId) {
                throw new exceptions_1.UnAuthorizedException("Not Authorized to perform action");
            }
            const update = await this.model.update({ content }, { where: { id: id } });
            return update;
        }
        catch (err) {
            if (err instanceof exceptions_1.UnAuthorizedException) {
                throw new exceptions_1.UnAuthorizedException(err.message);
            }
            throw new exceptions_1.ModelNotFoundException("Answer", id);
        }
    }
    async delete(userId, id) {
        try {
            const answer = await this.getAnswer(id);
            if (answer.userId != userId)
                throw new exceptions_1.UnAuthorizedException("Not Authorized to perform action");
            await this.model.destroy({ where: { id: id } });
            return "";
        }
        catch (err) {
            if (err instanceof exceptions_1.UnAuthorizedException) {
                throw new exceptions_1.UnAuthorizedException(err.message);
            }
            throw new exceptions_1.ModelNotFoundException("Answer", id);
        }
    }
};
AnswerRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], AnswerRepository);
exports.default = AnswerRepository;
