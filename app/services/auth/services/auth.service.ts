import { Injectable } from "@decorators/di";
import { UserEntity } from "@/user/entities/user.entity";
import { AuthVerifyDto } from "../schemas/authVerify.dto";
import { BadRequestException, generateId } from "@vigilio/express-core";

@Injectable()
export class AuthService {
	async verify({ email }: AuthVerifyDto) {
		const user = await UserEntity.findOne({ where: { email } });
		if (!user)
			throw new BadRequestException("No se encontró este correco electronico");
		user.token = generateId();
		await user.save();
		return {
			success: true,
			user: {
				name: user.name,
			},
		};
	}

	async confirmedAccount(token: string) {
		let user = await UserEntity.findOne({
			where: {
				token,
			},
			attributes: ["id", "name", "email"],
		});

		if (user) {
			user.token = null;
			user.habilitado = true;
			user = await user.save();
		}

		return user;
	}
}
