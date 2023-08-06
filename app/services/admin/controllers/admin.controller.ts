import { Controller, Get, Req, Res } from "@decorators/express";
import { Response, Request } from "express";
import { AdminService } from "../services/admin.service";
import { Injectable } from "@decorators/di";

@Injectable()
@Controller("/")
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
	@Get("/")
	async dashboard(@Res() res: Response, @Req() _req: Request) {
		const result = await this.adminService.dashboard();
		return res.render("admin/dashboard", result);
	}
}
