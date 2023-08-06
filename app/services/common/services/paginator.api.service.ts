import { Injectable } from "@decorators/di";
import { type PaginatorEntities } from "../types/paginator.types";
import { ProductsEntity } from "@/products/entities/products.entity";
import { enviroments } from "~/config/enviroments.config";

@Injectable()
export class PaginatorApiService {
	async index(entity: PaginatorEntities, limit: string, offset: string) {
		const convertLimit = Number(limit);
		const convertOffset = Number(offset);
		let data: ProductsEntity[] = [];
		let total: number | null = null;
		switch (entity) {
			case "products":
				[data, total] = await Promise.all([
					ProductsEntity.findAll({
						limit: convertLimit,
						offset: convertOffset,
					}),
					ProductsEntity.count(),
				]);
				break;
			case "users":
				break;

			default:
				break;
		}
		const offsetTotal = convertOffset + convertLimit;
		const next = `${enviroments.VITE_URL}/api/paginator/${entity}?offset=${offsetTotal}&limit=${convertLimit}`;

		const offsetPrevious = convertOffset - convertLimit;
		const previous = `${enviroments.VITE_URL}/api/paginator/${entity}?offset=${offsetPrevious}&limit=${convertLimit}`;

		return {
			success: true,
			total,
			next,
			previous: offsetPrevious < 0 ? null : previous,
			data,
		};
	}
}
