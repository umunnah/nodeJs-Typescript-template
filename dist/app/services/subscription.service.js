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
const subscription_repository_1 = __importDefault(require("../repository/subscription.repository"));
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.create = this.create.bind(this);
        this.getQuestionSubscriptions = this.getQuestionSubscriptions.bind(this);
        this.deleteSubscription = this.deleteSubscription.bind(this);
    }
    async create(req) {
        const { questionId } = req.body;
        const userId = req.user.id;
        return await this.subscriptionRepository.create(userId, questionId);
    }
    async getQuestionSubscriptions(questionId) {
        const result = await this.subscriptionRepository.getQuestionSubscriptions(questionId);
        return result.map((data) => {
            return data.User;
        });
    }
    async deleteSubscription(req) {
        return await this.subscriptionRepository.deleteSubscription(parseInt(req.params.questionId), req.user.id);
    }
};
SubscriptionService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [subscription_repository_1.default])
], SubscriptionService);
exports.default = SubscriptionService;
