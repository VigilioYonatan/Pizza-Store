import { Injectable } from "@decorators/di";
import { Controller, Get, Params, Query } from "@decorators/express";
import { PaginatorApiService } from "../services/paginator.api.service";
import { Pipe } from "@vigilio/express-core";
import { type PaginatorEntities } from "../types/paginator.types";

@Injectable()
@Controller("/paginator")
export class PaginatorApiController {
	constructor(private readonly paginatorApiService: PaginatorApiService) {}

	@Pipe((z) => ({
		entity: z.string().refine(
			(val) =>
				(["users", "products"] as PaginatorEntities[]).includes(
					val as PaginatorEntities,
				),
			(val) => ({ message: `${val} no está permitido`, path: ["entity"] }),
		),
	}))
	@Get("/:entity")
	async index(
		@Params("entity") entity: PaginatorEntities,
		@Query("limit") limit = "20",
		@Query("offset") offset = "0",
	) {
		const result = await this.paginatorApiService.index(entity, limit, offset);
		return result;
	}
}
