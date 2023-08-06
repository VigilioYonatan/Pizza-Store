import { useQuery } from "@vigilio/vue-fetching";
import { Pagination } from "@vigilio/vue-table";
import BASE_URL from "~/lib/axios";

export const productsPaginatorApi = ({ limit, offset }: Pagination) =>
	useQuery("/paginator/products", async function (url: string) {
		const params = new URLSearchParams();
		params.append("offset", String(offset));
		params.append("limit", String(limit));
		// for (const [key, value] of Object.entries(sort.sort)) {
		//     data.append(key, value);
		// }
		const { data } = await BASE_URL.get<ProductsPaginatorAPI>(url);
		return data;
	});

export interface ProductsPaginatorAPI {
	success: boolean;
	total: number;
	next: string;
	previous: string;
	data: ProductPaginator[];
}

export interface ProductPaginator {
	id: number;
	name: string;
	description: string;
	price: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}
