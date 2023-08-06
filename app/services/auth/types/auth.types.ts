import { userSchema } from "@/user/schemas/user.schema";
import * as z from "zod";

export const userAccess = userSchema.pick({
	id: true,
	name: true,
	email: true,
});
export type UserAccess = z.infer<typeof userAccess>;
