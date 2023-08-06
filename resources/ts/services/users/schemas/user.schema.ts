import { z } from "zod";

export const userSchema = z
	.object({
		id: z.number(),
		name: z
			.string()
			.min(1, "Este campo es obligatorio")
			.min(3, "mínimo 3 carácteres"),
		email: z
			.string()
			.min(1, "Este campo es obligatorio")
			.email("Correo electrónico no válido"),
		password: z
			.string()
			.min(1, "Este campo es obligatorio")
			.min(6, "mínimo 6 carácteres"),
		facebook: z.string().nullable(),
		token: z.string().nullable(),
		habilitado: z.boolean(),
	})
	.strict();

export type UserSchema = z.infer<typeof userSchema>;
