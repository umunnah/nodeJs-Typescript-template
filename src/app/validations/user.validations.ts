import { check } from "express-validator";
import UserRepository from "../repository/user.repository";
const userRepository = new UserRepository();

export default {
	create: [
		check("email")
			.isString()
			.withMessage("Email is required.")
			.normalizeEmail()
			.isEmail()
			.withMessage("Invalid email format")
			.custom(async (email) => {
				try {
					await userRepository.findByColumn("email",email);
				} catch (e) {
					return true;
				}

				throw new Error("Email already exists.");
			}),

		
		check("first_name")
			.isString()
			.withMessage("First name is required"),

		check("last_name")
			.isString()
			.withMessage("Last name is required"),
			
		check("password")
			.isString()
			.withMessage("Password is required")
			.isLength({ min: 6 })
			.withMessage("Password should be greater than 6 characters long."),
	],

  login: [
    check("email").
        isString().withMessage("Email is required."),

    check("password").
        isString().withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password should be greater than 6 characters long."),
],


};
