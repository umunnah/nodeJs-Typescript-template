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
const question_service_1 = __importDefault(require("../services/question.service"));
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
        this.create = this.create.bind(this);
        this.questions = this.questions.bind(this);
        this.question = this.question.bind(this);
    }
    async create(req, res, next) {
        try {
            const question = await this.questionService.create(req);
            res.status(201).json({ 'message': 'success', 'data': question });
        }
        catch (e) {
            next(e);
        }
    }
    async questions(req, res, next) {
        try {
            let questions = await this.questionService.getQuestions(req);
            res.status(200).json({ 'message': 'success', 'data': questions });
        }
        catch (err) {
            next(err);
        }
    }
    async question(req, res, next) {
        try {
            const { id } = req.params;
            let question = await this.questionService.getQuestion(id);
            res.status(200).json({ 'message': 'success', 'data': question });
        }
        catch (err) {
            next(err);
        }
    }
};
QuestionController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [question_service_1.default])
], QuestionController);
exports.default = QuestionController;
