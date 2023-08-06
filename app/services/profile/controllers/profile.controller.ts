import { Injectable } from "@decorators/di";
import { Controller, Get, Params, Req, Res } from "@decorators/express";
import { ProfileService } from "../services/profile.service";
import { Request, Response } from "express";

@Injectable()
@Controller("/")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get("/")
    async index(@Req() _req: Request, @Res() res: Response) {
        // if (!req.user) {
        //     res.redirect("/");
        //     return;
        // }

        return res.render("profile/index");
    }

    @Get("/:slug")
    async show(@Params("slug") slug: string, @Res() res: Response) {
        const result = await this.profileService.show(slug);
        if (!result.user) {
            res.status(404);
        }
        return res.render("profile/user", result);
    }
}
