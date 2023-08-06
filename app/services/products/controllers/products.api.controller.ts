import { Injectable } from "@decorators/di";
import { ProductsApiService } from "../services/products.api.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Params,
	Post,
	Put,
	Status,
} from "@decorators/express";
import { Pipe, Validator } from "@vigilio/express-core";
import {
	ProductsStoreApiDto,
	productsStoreApiDto,
} from "../dtos/products.store.api.dto";
import {
	ProductsUpdateApiDto,
	productsUpdateApiDto,
} from "../dtos/product.update.dto";

@Injectable()
@Controller("/products")
export class ProductsApiController {
	constructor(private readonly productsService: ProductsApiService) {}

	@Get("/")
	async index() {
		const result = await this.productsService.index();
		return result;
	}

	@Pipe((z) => ({ slug: z.string() }))
	@Get("/:slug")
	async show(@Params("slug") slug: string) {
		const result = await this.productsService.show(slug);
		return result;
	}

	@Status(201)
	@Validator(productsStoreApiDto)
	@Post("/")
	async store(@Body() productStoreApiDto: ProductsStoreApiDto) {
		const result = await this.productsService.store(productStoreApiDto);
		return result;
	}

	@Status(201)
	@Pipe((z) => ({ id: z.string() }))
	@Validator(productsUpdateApiDto)
	@Put("/:id")
	async update(
		@Params("id") id: string,
		@Body() productsUpdateApiDto: ProductsUpdateApiDto,
	) {
		const result = await this.productsService.update(id, productsUpdateApiDto);
		return result;
	}

	@Status(201)
	@Pipe((z) => ({ id: z.string() }))
	@Delete("/:id")
	async destroy(@Params("id") id: string) {
		const result = await this.productsService.destroy(id);
		return result;
	}
}
