import { Injectable } from "@decorators/di";
import { Controller, Get, Params } from "@decorators/express";
import { UserService } from "./user.service";
import { Res } from "@decorators/express";
import { Response } from "express";

@Injectable()
@Controller("/users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("/")
	async index(@Res() res: Response) {
		const result = await this.userService.index();
		return res.render("admin/users/index", { page: "Usuarios" });
	}
	@Get("/create")
	async create(@Res() res: Response) {
		return res.render("admin/users/create", { page: "Crear usuario" });
	}
	@Get("/:id")
	async show(@Params("id") id: string, @Res() res: Response) {
		const user = await this.userService.show(id);
		if (!user) {
			res.status(404);
			return res.render("admin/users/show", {
				page: "No encontrado",
				id,
			});
		}
		return res.render("admin/users/show", { page: user.name, user });
	}
}
