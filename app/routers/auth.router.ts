import { Type } from "@decorators/di/lib/src/types";
import { AuthController } from "~/services/auth/controllers/auth.controller";

export const authRouters: Type[] = [AuthController];
