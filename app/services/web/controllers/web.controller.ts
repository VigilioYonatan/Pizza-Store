import { Controller, Get, Req, Res } from "@decorators/express";
import { Request, Response } from "express";
import { WebService } from "../services/web.service";
import { Injectable } from "@decorators/di";

@Injectable()
@Controller("/")
export class WebController {
	constructor(private readonly webService: WebService) {}

	@Get("/")
	async home(@Res() res: Response, @Req() req: Request) {
		res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
		res.header("Expires", "-1");
		res.header("Pragma", "no-cache");
		res.header("Accept-Encoding", "gzip, compress, br");
		const successMessage = req.flash("success");
		const errorMessage = req.flash("error");
		const result = await this.webService.home()
		return res.render("web/home", {
			errorMessage,
			successMessage,
			...result
		});
	}
}
