import { userSchema } from "@/user/schemas/user.schema";
import * as z from "zod";

export const authVerifyDto = userSchema.pick({ email: true });

export type AuthVerifyDto = z.infer<typeof authVerifyDto>;
