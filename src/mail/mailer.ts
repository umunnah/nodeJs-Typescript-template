import * as nodeMailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
require("dotenv").config();

const sendEmail = async (options: any) => {
	const Host: any = process.env.SMTP_HOST || 'smtp.gmail.com';
	const Port: any = process.env.SMTP_PORT || 587;

	const nodemailerOptions: SMTPTransport.Options = {
		host: Host,
		port: Port,
		secure: false,
		auth: {
			user: process.env.SMTP_EMAIL || 'example@example.com',
			pass: process.env.SMTP_PASSWORD || 'password',
		},
	};

	const transporter = nodeMailer.createTransport(nodemailerOptions);

	const fromName =
		options.from === undefined ? process.env.FROM_NAME : options.from;
	const message = {
		from: `${fromName} <${process.env.SMTP_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	await transporter.sendMail(message);
};

export default sendEmail;
