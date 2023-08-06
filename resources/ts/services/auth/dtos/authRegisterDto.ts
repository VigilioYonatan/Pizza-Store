import { userSchema } from "#/users/schemas/user.schema";
import * as z from "zod";

export const authRegisterDto = userSchema
	.pick({
		name: true,
		email: true,
		password: true,
	})
	.extend({ repeat_password: z.string().min(1, "Este campo es obligatorio") })
	.refine(({ password, repeat_password }) => password === repeat_password, {
		message: "contraseña no similares",
		path: ["repeat_password"],
	});
export type AuthRegisterDto = z.infer<typeof authRegisterDto>;
