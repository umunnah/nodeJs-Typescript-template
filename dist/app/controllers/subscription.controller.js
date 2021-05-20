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
const subscription_service_1 = __importDefault(require("../services/subscription.service"));
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
        this.create = this.create.bind(this);
        this.questionSubscriptions = this.questionSubscriptions.bind(this);
        this.deleteSubscription = this.deleteSubscription.bind(this);
    }
    async create(req, res, next) {
        try {
            const subscription = await this.subscriptionService.create(req);
            res.status(201).json({ 'message': 'success', 'data': subscription });
        }
        catch (e) {
            next(e);
        }
    }
    async questionSubscriptions(req, res, next) {
        try {
            let subscriptions = await this.subscriptionService.getQuestionSubscriptions(parseInt(req.params.questionId));
            res.status(200).json({ 'message': 'success', 'data': subscriptions });
        }
        catch (err) {
            next(err);
        }
    }
    async deleteSubscription(req, res, next) {
        try {
            await this.subscriptionService.deleteSubscription(req);
            res.status(200).json({ 'message': 'success', 'data': "" });
        }
        catch (err) {
            next(err);
        }
    }
};
SubscriptionController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [subscription_service_1.default])
], SubscriptionController);
exports.default = SubscriptionController;
