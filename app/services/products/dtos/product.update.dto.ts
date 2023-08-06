import * as z from "zod";
import { productsSchema } from "../schemas/product.schema";

export const productsUpdateApiDto = productsSchema.omit({ id: true });
export type ProductsUpdateApiDto = z.infer<typeof productsUpdateApiDto>;
