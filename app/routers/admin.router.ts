import { Type } from "@decorators/di/lib/src/types";
import { AdminController } from "~/services/admin/controllers/admin.controller";
import { UserController } from "@/user/user.controller";
import { ProductsController } from "@/products/controllers/products.controller";

export const adminRouters: Type[] = [
	AdminController,
	UserController,
	ProductsController,
];
