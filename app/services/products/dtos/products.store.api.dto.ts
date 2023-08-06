import * as z from "zod";
import { ProductsEntity } from "../entities/products.entity";
import { productsSchema } from "../schemas/product.schema";

export const productsStoreApiDto = productsSchema.omit({ id: true }).refine(
	async ({ name }) => {
		const existName = await ProductsEntity.findOne({
			where: {
				name,
			},
		});
		return !existName;
	},
	({ name }) => ({
		path: ["name"],
		message: `Este producto ${name} ya existe`,
	}),
);
export type ProductsStoreApiDto = z.infer<typeof productsStoreApiDto>;
