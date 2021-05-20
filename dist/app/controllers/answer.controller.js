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
const answer_service_1 = __importDefault(require("../services/answer.service"));
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
        this.create = this.create.bind(this);
        this.questionAnswers = this.questionAnswers.bind(this);
        this.userAnswers = this.userAnswers.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
    }
    async create(req, res, next) {
        try {
            const answer = await this.answerService.create(req);
            res.status(201).json({ 'message': 'success', 'data': answer });
        }
        catch (e) {
            next(e);
        }
    }
    async questionAnswers(req, res, next) {
        try {
            let answers = await this.answerService.getQuestionAnswers(parseInt(req.params.questionId));
            res.status(200).json({ 'message': 'success', 'data': answers });
        }
        catch (err) {
            next(err);
        }
    }
    async userAnswers(req, res, next) {
        try {
            const { id } = req.user;
            let answer = await this.answerService.getUserAnswers(id);
            res.status(200).json({ 'message': 'success', 'data': answer });
        }
        catch (err) {
            next(err);
        }
    }
    async getAnswer(req, res, next) {
        try {
            let answer = await this.answerService.getAnswer(parseInt(req.params.id));
            res.status(200).json({ 'message': 'success', 'data': answer });
        }
        catch (err) {
            next(err);
        }
    }
    async updateAnswer(req, res, next) {
        try {
            await this.answerService.updateAnswer(req);
            res.status(200).json({ 'message': 'success', 'data': [] });
        }
        catch (err) {
            next(err);
        }
    }
    async deleteAnswer(req, res, next) {
        try {
            await this.answerService.deleteAnswer(req);
            res.status(200).json({ 'message': 'success', 'data': [] });
        }
        catch (err) {
            next(err);
        }
    }
};
AnswerController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [answer_service_1.default])
], AnswerController);
exports.default = AnswerController;
