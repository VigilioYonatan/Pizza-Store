import { Injectable } from "@decorators/di";
import { ProductsEntity } from "@/products/entities/products.entity";

@Injectable()
export class WebService {
	
	async home() {
		const productLatest = await ProductsEntity.findAll({limit:4,order:[["createdAt","DESC"]],raw:true})
		return { productLatest };
	}
}
