import nodemailer from "nodemailer";
import { enviroments } from "~/config/enviroments.config";

const transporter = nodemailer.createTransport({
	host: enviroments.MAIL_HOST,
	port: enviroments.MAIL_PORT,
	auth: {
		user: enviroments.MAIL_USER,
		pass: enviroments.MAIL_PASS,
	},
});
export function sendEmail(nombre: string, email: string, token: string) {
	return transporter.sendMail(
		{
			from: enviroments.MAIL_USER_EMAIL,
			to: email,
			subject: "register account succelly",
			text: `
            <div>
                <p>Cuenta creado correctamente ${nombre} <a href="${enviroments.VITE_URL}/auth/confirmed-account?token=${token}"></a></p>
            </div>
            `,
		},
		(err) => {
			if (err) {
				// rome-ignore lint/nursery/noConsoleLog: <explanation>
				console.log("Error occurred while sending the email:", err);
			} else {
				// rome-ignore lint/nursery/noConsoleLog: <explanation>
				console.log("Email sent");
			}
		},
	);
}
