import { productsSchema } from "#/products/schemas/products.schema";
import * as z from 'zod';

const productFavoriteSchema = productsSchema.omit({description:true,slug:true})

export type ProductFavoriteSchema = z.infer<typeof productFavoriteSchema>