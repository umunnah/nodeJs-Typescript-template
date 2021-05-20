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
const question_repository_1 = __importDefault(require("../repository/question.repository"));
let QuestionService = class QuestionService {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
        this.create = this.create.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
    }
    async create(req) {
        const { title, content } = req.body;
        const userId = req.user.id;
        const data = { title, content, 'userId': userId };
        return await this.questionRepository.create(data);
    }
    async getQuestions(req) {
        return await this.questionRepository.getQuestions(req);
    }
    async getQuestion(id) {
        return await this.questionRepository.getQuestion(id);
    }
};
QuestionService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [question_repository_1.default])
], QuestionService);
exports.default = QuestionService;
