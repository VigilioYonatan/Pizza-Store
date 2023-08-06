import { useQuery } from "@vigilio/vue-fetching";
import BASE_URL from "~/lib/axios";

export const productsShowApi = (id: number) =>
    useQuery(`/products/${id}`, async function (url: string) {
        const { data } = await BASE_URL.get<ProductShowAPI>(url);
        return data;
    });

export interface ProductShowAPI {
    success: boolean;
    product: Product;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    offer: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}
