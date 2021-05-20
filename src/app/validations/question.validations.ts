import { check } from "express-validator";

export default {
	create: [
		check("title")
			.isString()
			.withMessage("Question Title is required"),

		check("content")
			.isString()
			.withMessage("Content is required"),
			
	],

  update: [
    check("title")
			.isString()
			.withMessage("Question Title is required"),

		check("content")
			.isString()
			.withMessage("Content is required"),
],


};
