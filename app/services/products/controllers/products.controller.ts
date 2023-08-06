import { Injectable } from "@decorators/di";
import { Controller, Get, Params, Res } from "@decorators/express";
import { Response } from "express";
import { ProductsService } from "../services/products.service";

@Injectable()
@Controller("/products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get("/")
	async index(@Res() res: Response) {
		const result = await this.productsService.index();
		return res.render("admin/products/index", result);
	}

	@Get("/:slug")
	async show(@Params("slug") slug: string, @Res() res: Response) {
		const result = await this.productsService.show(slug);
		if (!result.products) {
			res.status(404);
		}
		return res.render("admin/products/show", result);
	}
	@Get("/create")
	async create(@Res() res: Response) {
		return res.render("admin/products/create");
	}
	async edit() {}
}
