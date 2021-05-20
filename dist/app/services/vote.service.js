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
const vote_repository_1 = __importDefault(require("../repository/vote.repository"));
let VoteService = class VoteService {
    constructor(voteRepository) {
        this.voteRepository = voteRepository;
        this.create = this.create.bind(this);
        this.getAnswerVotes = this.getAnswerVotes.bind(this);
        this.getUserVotes = this.getUserVotes.bind(this);
        this.deleteVote = this.deleteVote.bind(this);
    }
    async create(req) {
        const { answerId, value } = req.body;
        const userId = req.user.id;
        const data = { value, answerId, userId: userId };
        const result = await this.voteRepository.create(data);
        return result;
    }
    async getAnswerVotes(answerId) {
        return await this.voteRepository.getAnswerVotes(answerId);
    }
    async getUserVotes(userId) {
        return await this.voteRepository.getUserVotes(userId);
    }
    async deleteVote(req) {
        return await this.voteRepository.delete(req.user.id, req.params.id);
    }
};
VoteService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [vote_repository_1.default])
], VoteService);
exports.default = VoteService;
