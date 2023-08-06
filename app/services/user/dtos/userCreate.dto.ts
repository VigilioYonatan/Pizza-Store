import { UserEntity } from "../entities/user.entity";
import { userSchema } from "../schemas/user.schema";

export const userCreateDto = userSchema.omit({ id: true }).refine(
	async (val) => {
		const user = await UserEntity.findOne({
			where: { nombre: val.name },
		});
		return !user;
	},
	{ message: "its already nombre", params: ["nombre"] },
);
