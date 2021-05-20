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
const user_service_1 = __importDefault(require("../services/user.service"));
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.profile = this.profile.bind(this);
    }
    async create(req, res, next) {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json({ 'message': 'success', 'data': user });
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            let token = await this.userService.login(email, password);
            res.status(200).json({ 'message': 'success', 'data': `${token}` });
        }
        catch (err) {
            next(err);
        }
    }
    async profile(req, res, next) {
        try {
            let user = await this.userService.getUser(req.user.id);
            res.status(200).json({ 'message': 'success', 'data': user });
        }
        catch (err) {
            next(err);
        }
    }
};
AuthController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [user_service_1.default])
], AuthController);
exports.default = AuthController;
