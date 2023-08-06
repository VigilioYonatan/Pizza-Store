import { Inject, Injectable } from "@decorators/di";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
	async index() {
		const data = await UserEntity.findAll();
		return {
			data,
		};
	}

	async show(id: string) {
		const user = await UserEntity.findByPk(id, { raw: true });

		return user;
	}

	async store() {}

	async update() {}

	async destroy(id: string) {
		return id;
	}
}
