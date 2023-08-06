import { Injectable } from "@decorators/di";
import { ProductsEntity } from "../entities/products.entity";

@Injectable()
export class ProductsService {
	async index() {
		return { page: "Productos", breadcrumb: ["users"] };
	}
	async show(slug: string) {
		const products = await ProductsEntity.findOne({ where: { slug } });
		return { products };
	}
	async create() {}
	async edit() {}
}
