import { type AxiosError } from "axios-minified";

export function getError<T extends string>(error: unknown) {
	return (err: T) => {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const errorAxios = error as AxiosError<any>;
		// rome-ignore lint/complexity/useOptionalChain: <explanation>
		if (errorAxios.response && errorAxios.response.data) {
			return errorAxios.response.data[err];
		}
		return `Comuncarse con el desarrollador ${errorAxios.message}`;
	};
}
export type ErrorBody<T> = AxiosError<{
	success: boolean;
	body: keyof T;
	message: string;
}>;
