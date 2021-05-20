import { Service } from "typedi";
import Bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import db from "../models";
import { ModelNotFoundException, UnAuthorizedException } from "../../libraries/exceptions";

@Service()
class UserRepository {
	public model: any;
	constructor() {
		this.model = db.User;
	}

	async create(data: any) {
		try {
			const user = await this.model.create({
				firstName: data.first_name,
				lastName: data.last_name,
				email: data.email,
				password: await this.generateHash(data.password),
			});
			return user;
		} catch (e) {
			throw new Error(e);
		}
	}

	async login(email: string, password: string) {
		try {
			const user = await this.findByColumn('email', email);
			const checkPassword = await this.matchPassword(password, user.password);
			if (!checkPassword) throw new UnAuthorizedException("Invalid credentials");
			let token = this.generateToken(user.id);
			return token;
		} catch (e) {
			throw new UnAuthorizedException("Invalid credentials");
		}
	}

	async getUser(id: string) {
		try {
			const user = await this.model.findOne({ where: { id: id } });
			if (user != null) return user;
			throw new ModelNotFoundException("User", id);
		} catch (err) {
			throw new ModelNotFoundException('User', id)
		}
	}
	async findByColumn(column: string, value: any) {
		const users = await this.model.findAll({ where: { 'email': value } });
		if (users.length == 0) {
			throw new ModelNotFoundException('User', value, column);
		}
		return users[0];
	}

	async generateHash(password: any) {
		const salt = await Bcrypt.genSalt(10);
		return await Bcrypt.hash(password, salt);
	}

	async matchPassword(password: any, userPassword: string) {
		return await Bcrypt.compare(password, userPassword);
	}
	// method to generateToken
	generateToken(userId: string) {
		const jwtSecret = `${process.env.JWT_SECRET}`;
		const expireAt = parseInt(`${process.env.JWT_SECRET}`)
		return jwt.sign(
			{ id: userId },
			jwtSecret,
			{ expiresIn: expireAt }
		)
	}
}

export default UserRepository;
