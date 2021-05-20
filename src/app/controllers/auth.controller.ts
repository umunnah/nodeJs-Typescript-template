import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import UserService from "../services/user.service";

@Service()
class AuthController {
	constructor(public userService: UserService) {
		this.create = this.create.bind(this);
		this.login = this.login.bind(this);
		this.profile = this.profile.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.userService.create(req.body);
			res.status(201).json({'message':'success', 'data':user });
		} catch (e) {
			next(e);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const {email, password} = req.body
		try {
			let token = await this.userService.login(email,password);
			res.status(200).json({'message': 'success','data': `${token}`});
		} catch (err) {
			next(err);
		}
	}

	async profile(req: Request, res: Response, next: NextFunction) {
		try {
			let user = await this.userService.getUser(req.user.id);
			res.status(200).json({'message': 'success','data': user});
		} catch (err) {
			next(err);
		}
	}
}

export default AuthController;
