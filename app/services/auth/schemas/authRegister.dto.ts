import { userSchema } from "@/user/schemas/user.schema";
import * as z from "zod";
import { UserEntity } from "@/user/entities/user.entity";

export const authRegisterDto = userSchema
	.pick({
		name: true,
		email: true,
		password: true,
	})
	.extend({
		repeat_password: z.string().min(1, "Este campo es obligatorio"),
	})
	.refine(
		async ({ name }) => {
			const existUser = await UserEntity.findOne({
				where: {
					name,
				},
			});
			return !existUser;
		},
		({ name }) => ({
			message: `${name} ya existe en nuestro sistema`,
			path: ["name"],
		}),
	)
	.refine(
		async ({ email }) => {
			const existEmail = await UserEntity.findOne({
				where: {
					email,
				},
			});
			return !existEmail;
		},
		({ email }) => ({
			message: `El correo ${email} ya existe en nuestro sistema`,
			path: ["email"],
		}),
	)
	.refine(({ repeat_password, password }) => repeat_password === password, {
		message: "Contraseña no similares",
		path: ["repeat_password"],
	});
export type AuthRegisterDto = z.infer<typeof authRegisterDto>;
