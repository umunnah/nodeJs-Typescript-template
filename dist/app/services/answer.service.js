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
const answer_repository_1 = __importDefault(require("../repository/answer.repository"));
const subscription_service_1 = __importDefault(require("./subscription.service"));
const question_service_1 = __importDefault(require("./question.service"));
const mail_service_1 = __importDefault(require("./mail.service"));
let AnswerService = class AnswerService {
    constructor(answerRepository, subscriptionService, questionService, mailer) {
        this.answerRepository = answerRepository;
        this.subscriptionService = subscriptionService;
        this.questionService = questionService;
        this.mailer = mailer;
        this.create = this.create.bind(this);
        this.getQuestionAnswers = this.getQuestionAnswers.bind(this);
        this.getUserAnswers = this.getUserAnswers.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }
    async create(req) {
        const { questionId, content } = req.body;
        const userId = req.user.id;
        const data = { content, questionId, userId: userId };
        const result = await this.answerRepository.create(data);
        await this.sendMail(questionId);
        return result;
    }
    async getQuestionAnswers(questionId) {
        await this.questionService.getQuestion(questionId);
        return await this.answerRepository.getQuestionAnswers(questionId);
    }
    async getUserAnswers(userId) {
        return await this.answerRepository.getUserAnswers(userId);
    }
    async getAnswer(id) {
        return await this.answerRepository.getAnswer(id);
    }
    async updateAnswer(req) {
        return await this.answerRepository.updateAnswer(req.user.id, req.body.content, req.params.id);
    }
    async deleteAnswer(req) {
        return await this.answerRepository.delete(req.user.id, req.params.id);
    }
    async sendMail(questionId) {
        const questionSubscribers = await this.subscriptionService.getQuestionSubscriptions(questionId);
        if (questionSubscribers.length > 0) {
            let num = 0;
            for (num; num < questionSubscribers.length; num++) {
                const subscribers = questionSubscribers[num];
                const msg = `Question with id: ${questionId} has been answer`;
                await this.mailer.sendMail(subscribers.email, "Subscription Notification", msg);
            }
        }
    }
};
AnswerService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [answer_repository_1.default,
        subscription_service_1.default,
        question_service_1.default,
        mail_service_1.default])
], AnswerService);
exports.default = AnswerService;
