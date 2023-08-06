import { customArray } from "@vigilio/express-core/helpers";
import { ProductsSeederSchema } from "../schemas/product.schema";
import { faker } from "@faker-js/faker";
import { slug } from "~/lib/helpers";

export const productsSeeder: ProductsSeederSchema[] = customArray(20).map(
	() => {
		const name = faker.commerce.productName();
		return {
			name,
			description: faker.commerce.productDescription(),
			price: Number(faker.commerce.price()),
			slug: slug(name),
			offer:Number(faker.number.float({min:0,max:0.9,precision:2}))
		};
	},
);
