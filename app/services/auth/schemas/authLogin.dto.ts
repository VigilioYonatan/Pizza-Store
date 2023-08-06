import { userSchema } from "@/user/schemas/user.schema";
import * as z from "zod";

export const authLoginDto = userSchema.pick({ email: true, password: true });

export type AuthLoginDto = z.infer<typeof authLoginDto>;
