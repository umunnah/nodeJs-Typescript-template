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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    async create(data) {
        return await this.userRepository.create(data);
    }
    async login(email, password) {
        return await this.userRepository.login(email, password);
    }
    async getUser(id) {
        return await this.userRepository.getUser(id);
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [user_repository_1.default])
], UserService);
exports.default = UserService;
