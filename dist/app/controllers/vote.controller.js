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
const vote_service_1 = __importDefault(require("../services/vote.service"));
let VoteController = class VoteController {
    constructor(voteService) {
        this.voteService = voteService;
        this.create = this.create.bind(this);
        this.answerVotes = this.answerVotes.bind(this);
        this.userVotes = this.userVotes.bind(this);
        this.deleteVote = this.deleteVote.bind(this);
    }
    async create(req, res, next) {
        try {
            const vote = await this.voteService.create(req);
            res.status(201).json({ 'message': 'success', 'data': vote });
        }
        catch (e) {
            next(e);
        }
    }
    async answerVotes(req, res, next) {
        try {
            let votes = await this.voteService.getAnswerVotes(parseInt(req.params.answerId));
            res.status(200).json({ 'message': 'success', 'data': votes });
        }
        catch (err) {
            next(err);
        }
    }
    async userVotes(req, res, next) {
        try {
            let votes = await this.voteService.getUserVotes(req.user.id);
            res.status(200).json({ 'message': 'success', 'data': votes });
        }
        catch (err) {
            next(err);
        }
    }
    async deleteVote(req, res, next) {
        try {
            await this.voteService.deleteVote(req);
            res.status(200).json({ 'message': 'success', 'data': [] });
        }
        catch (err) {
            next(err);
        }
    }
};
VoteController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [vote_service_1.default])
], VoteController);
exports.default = VoteController;
