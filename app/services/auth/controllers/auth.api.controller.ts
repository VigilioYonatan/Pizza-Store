import { Injectable } from "@decorators/di";
import { Body, Controller, Post, Status } from "@decorators/express";
import { Validator } from "@vigilio/express-core";
import { sendEmail } from "~/lib/mailTrap";
import { AuthLoginDto, authLoginDto } from "../schemas/authLogin.dto";
import { AuthRegisterDto, authRegisterDto } from "../schemas/authRegister.dto";
import { AuthApiService } from "../services/auth.api.service";
import { passportLogin } from "../passport/loginMiddleware";
import { AuthVerifyDto, authVerifyDto } from "../schemas/authVerify.dto";

@Injectable()
@Controller("/auth")
export class AuthApiController {
	constructor(private readonly authApiService: AuthApiService) {}

	@Validator(authLoginDto)
	@Post("/login", [passportLogin])
	login(@Body() authLoginDto: AuthLoginDto) {
		const result = this.authApiService.login(authLoginDto);
		return result;
	}

	@Status(202)
	@Validator(authRegisterDto)
	@Post("/register")
	async register(@Body() authRegisterDto: AuthRegisterDto) {
		sendEmail;
		const result = await this.authApiService.register(authRegisterDto);
		return result;
	}

	@Validator(authVerifyDto)
	@Post("/verify")
	async verify(@Body() authVerifyDto: AuthVerifyDto) {
		const result = await this.authApiService.verify(authVerifyDto);
		return result;
	}
}
