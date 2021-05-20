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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const exceptions_1 = require("../../libraries/exceptions");
let UserRepository = class UserRepository {
    constructor() {
        this.model = models_1.default.User;
    }
    async create(data) {
        try {
            const user = await this.model.create({
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                password: await this.generateHash(data.password),
            });
            return user;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async login(email, password) {
        try {
            const user = await this.findByColumn('email', email);
            const checkPassword = await this.matchPassword(password, user.password);
            if (!checkPassword)
                throw new exceptions_1.UnAuthorizedException("Invalid credentials");
            let token = this.generateToken(user.id);
            return token;
        }
        catch (e) {
            throw new exceptions_1.UnAuthorizedException("Invalid credentials");
        }
    }
    async getUser(id) {
        try {
            const user = await this.model.findOne({ where: { id: id } });
            if (user != null)
                return user;
            throw new exceptions_1.ModelNotFoundException("User", id);
        }
        catch (err) {
            throw new exceptions_1.ModelNotFoundException('User', id);
        }
    }
    async findByColumn(column, value) {
        const users = await this.model.findAll({ where: { 'email': value } });
        if (users.length == 0) {
            throw new exceptions_1.ModelNotFoundException('User', value, column);
        }
        return users[0];
    }
    async generateHash(password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        return await bcryptjs_1.default.hash(password, salt);
    }
    async matchPassword(password, userPassword) {
        return await bcryptjs_1.default.compare(password, userPassword);
    }
    // method to generateToken
    generateToken(userId) {
        const jwtSecret = `${process.env.JWT_SECRET}`;
        const expireAt = parseInt(`${process.env.JWT_SECRET}`);
        return jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: expireAt });
    }
};
UserRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.default = UserRepository;
