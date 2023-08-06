import { Controller, Get } from "@decorators/express";
import { sequelize } from "~/config/db.config";
import { UserEntity } from "../user/entities/user.entity";
import { userSeeder } from "@/user/seeders/user.seed";
import { ProductsEntity } from "../products/entities/products.entity";
import { productsSeeder } from "../products/seeders/products.seeder";

@Controller("/seed")
export class SeedApiController {
	@Get("/")
	async index() {
		await sequelize.sync({ force: true });

		await Promise.all([
			UserEntity.bulkCreate(userSeeder),
			ProductsEntity.bulkCreate(productsSeeder),
		]);

		return {
			success: true,
			message: "Executed seed",
		};
	}
}
