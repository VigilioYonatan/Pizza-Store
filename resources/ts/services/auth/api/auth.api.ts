import { useMutation } from "@vigilio/vue-fetching";
import { authLogin, authRegister } from "./auth.fetch.api";

const authApi = {
	login: function () {
		return useMutation("/auth/login", authLogin, { retry: 1 });
	},
	register: function () {
		return useMutation("/auth/register", authRegister, { retry: 1 });
	},
};

export default authApi;
