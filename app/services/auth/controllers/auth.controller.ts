import { Controller, Get, Req, Res, Query } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@decorators/di";
import passport from "passport";

@Injectable()
@Controller("/")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("/google", [passport.authenticate("google")])
	google() {}

	@Get("/google/callback", [
		passport.authenticate("google", {
			failureRedirect: "/",
			failureFlash: true,
			successRedirect: "/admin",
		}),
	])
	googleCB() {}

	@Get("/facebook", [passport.authenticate("facebook")])
	facebook() {}

	@Get("/facebook/callback", [
		passport.authenticate("facebook", {
			failureRedirect: "/",
			failureFlash: true,
			successRedirect: "/admin",
		}),
	])
	facebookCB() {}

	@Get("/confirmed-account")
	async confirmedAccount(
		@Query("token") token: string,
		@Res() res: Response,
	) {
		const user = await this.authService.confirmedAccount(token);
		if (!user) {
			res.status(404);
		}
		return res.render("auth/confirmed-account", { user });
	}

	@Get("/logout")
	async logout(
		@Res() res: Response,
		@Req() req: Request,
		next: NextFunction,
	) {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	}
}
