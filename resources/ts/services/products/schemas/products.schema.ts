import * as z from "zod";

export const productsSchema = z
	.object({
		id: z.number(),
		name: z
			.string({ required_error: "Este campo es obligatorio" })
			.min(3)
			.max(100),
		description: z.string(),
		price: z.number(),
		offer:z.number(),
		slug: z.string(),
	})
	.strict();
export type ProductsSchema = z.infer<typeof productsSchema>;