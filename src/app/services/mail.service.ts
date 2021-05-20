import { Service } from "typedi";
import MailTransport from "../../mail/mailer";

@Service()
class MailService {
	constructor() {}

	async sendMail(email: string, subject: string, message: string) {
		return await MailTransport({
			email:email,
			subject,
			message,
		});
	}
}

export default MailService;
