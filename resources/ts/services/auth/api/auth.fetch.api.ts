import BASE_URL from "~/lib/axios";
import { AuthRegisterDto } from "../dtos/authRegisterDto";
import { AuthLoginDto } from "../dtos/authLoginDto";
import { AuthLoginAPI, AuthRegisterAPI } from "./auth.types.api";

export async function authLogin(url: string, body: AuthLoginDto) {
	const { data } = await BASE_URL.post<AuthLoginAPI>(url, body);
	return data;
}
export async function authRegister(url: string, body: AuthRegisterDto) {
	const { data } = await BASE_URL.post<AuthRegisterAPI>(url, body);
	return data;
}
