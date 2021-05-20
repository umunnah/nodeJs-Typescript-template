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
let SubscriptionRepository = class SubscriptionRepository {
    constructor() {
        this.model = models_1.default.Subscription;
    }
    async create(userId, questionId) {
        try {
            let check = await this.model.findOne({
                where: { [sequelize_1.Op.and]: [{ userId: userId, questionId: questionId }] },
            });
            if (check)
                throw new exceptions_1.BadRequestException("Bad Request");
            const subscription = await this.model.create({ userId, questionId });
            return subscription;
        }
        catch (e) {
            throw new exceptions_1.BadRequestException(e);
        }
    }
    async getQuestionSubscriptions(questionId) {
        try {
            const data = await this.model.findAll({
                where: { questionId: questionId },
                include: [this.model.associations.User],
            });
            return data;
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException(err, 1);
        }
    }
    async deleteSubscription(questionId, userId) {
        try {
            const data = await this.getSubscription(questionId, userId);
            const result = await this.model.destroy({
                where: { [sequelize_1.Op.and]: [{ userId: userId, questionId: questionId }] },
            });
            return result;
        }
        catch (err) {
            throw new exceptions_1.BadRequestException(err);
        }
    }
    async getSubscription(questionId, userId) {
        try {
            const subscription = await this.model.findOne({
                where: { [sequelize_1.Op.and]: [{ userId: userId, questionId: questionId }] },
            });
            if (subscription != null)
                return subscription;
            throw new exceptions_1.ModelNotFoundException("Subscription", questionId);
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException("Subscription", questionId);
        }
    }
};
SubscriptionRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], SubscriptionRepository);
exports.default = SubscriptionRepository;
