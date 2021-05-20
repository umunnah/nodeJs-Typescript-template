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
let VoteRepository = class VoteRepository {
    constructor() {
        this.like = 0;
        this.dislike = 0;
        this.model = models_1.default.Vote;
    }
    async create(data) {
        try {
            const vote = await this.model.findOne({
                where: {
                    [sequelize_1.Op.and]: {
                        answerId: data.answerId,
                        userId: data.userId,
                        value: data.value
                    }
                }
            });
            if (vote != null && vote.value == data.value) {
                return vote;
            }
            else {
                const result = await this.model.create(data);
                return result;
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getAnswerVotes(answerId) {
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
            return { 'up': this.like, 'down': this.dislike };
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Votes", answerId);
        }
    }
    async getUserVotes(userId) {
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
            return { 'up': this.like, 'down': this.dislike };
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException(err, userId);
        }
    }
    async getVote(id) {
        try {
            const vote = await this.model.findOne({
                where: { id: id }
            });
            if (vote != null)
                return vote;
            throw new exceptions_1.ModelNotFoundException("Vote", id);
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Vote", id);
        }
    }
    async delete(userId, id) {
        try {
            const vote = await this.getVote(id);
            if (vote.userId != userId)
                throw new exceptions_1.UnAuthorizedException("Not Authorized to perform action");
            await this.model.destroy({ where: { id: id } });
            return "";
        }
        catch (err) {
            if (err instanceof exceptions_1.UnAuthorizedException) {
                throw new exceptions_1.UnAuthorizedException(err.message);
            }
            throw new exceptions_1.ModelNotFoundException("Vote", id);
        }
    }
};
VoteRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], VoteRepository);
exports.default = VoteRepository;
