import { Injectable } from "@decorators/di";
import { ProductsEntity } from "../entities/products.entity";
import { NotFoundException } from "@vigilio/express-core";
import { ProductsStoreApiDto } from "../dtos/products.store.api.dto";
import { ProductsUpdateApiDto } from "../dtos/product.update.dto";

@Injectable()
export class ProductsApiService {
	async index() {
		const data = await ProductsEntity.findAll({ raw: true });
		return {
			success: true,
			data,
		};
	}

	async show(slug: string) {
		let product = await ProductsEntity.findByPk(slug);
		if (!product) {
			product = await ProductsEntity.findOne({
				where: { slug },
			});
		}
		if (!product)
			throw new NotFoundException(`No se encontró este producto ${slug}`);
		return {
			success: true,
			product,
		};
	}

	async store(productsStoreApiDto: ProductsStoreApiDto) {
		const product = new ProductsEntity(productsStoreApiDto);
		await product.save();
		return {
			success: true,
			product,
		};
	}

	async update(id: string, productsUpdateApiDto: ProductsUpdateApiDto) {
		const { product } = await this.show(id);
		if (product.name === productsUpdateApiDto.name)
			throw new NotFoundException(
				`Ya hay un producto con este nombre ${productsUpdateApiDto.name}`,
				{ body: "name" },
			);
		await product.update(productsUpdateApiDto);
		return {
			success: true,
			product,
		};
	}

	async destroy(id: string) {
		const { product } = await this.show(id);
		await product.destroy();
		return {
			success: true,
			message: `el producto con el id: ${id} fue removido existosamente`,
		};
	}
}
