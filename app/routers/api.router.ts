import { Type } from "@decorators/di/lib/src/types";
import { SeedApiController } from "@/seed/seed.api.controller";
import { AuthApiController } from "@/auth/controllers/auth.api.controller";
import { ProductsApiController } from "@/products/controllers/products.api.controller";
import { PaginatorApiController } from "@/common/controllers/paginator.api.controller";

export const apiRouters: Type[] = [
	AuthApiController,
	ProductsApiController,
	PaginatorApiController,
	SeedApiController,
];
