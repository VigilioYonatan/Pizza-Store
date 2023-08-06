import { Injectable } from "@decorators/di";
import { UserEntity } from "@/user/entities/user.entity";
import { sendEmail } from "~/lib/mailTrap";
import { AuthLoginDto } from "../schemas/authLogin.dto";
import { AuthVerifyDto } from "../schemas/authVerify.dto";
import { AuthRegisterDto } from "../schemas/authRegister.dto";
import { BadRequestException, generateId } from "@vigilio/express-core";
import bcrypt from "bcryptjs";

@Injectable()
export class AuthApiService {
	async login(_authLoginDto: AuthLoginDto) {
		return {
			success: true,
		};
	}

	async register({ repeat_password, ...rest }: AuthRegisterDto) {
		const user = new UserEntity(rest);
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
		await user.save();
		sendEmail(user.name, user.email, user.token as string);
		return {
			success: true,
			user: {
				name: user.name,
			},
		};
	}

	async verify({ email }: AuthVerifyDto) {
		const user = await UserEntity.findOne({ where: { email } });
		if (!user)
			throw new BadRequestException(
				`No se encontró este correo electrónico ${email} en nuestro sistema`,
				{ body: "email" },
			);
		user.token = generateId();
		await user.save();
		return {
			success: true,
			// message:
		};
	}
}
