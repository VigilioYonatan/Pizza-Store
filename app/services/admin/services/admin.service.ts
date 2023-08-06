import { Injectable } from "@decorators/di";
import { UserEntity } from "@/user/entities/user.entity";
import { ProductsEntity } from "@/products/entities/products.entity";
import { ProductsIcon, UsersIcon } from "~/lib/icos";

@Injectable()
export class AdminService {
	async dashboard() {
		const [usersTotal, productsTotal, usersList] = await Promise.all([
			UserEntity.count(),
			ProductsEntity.count(),
			UserEntity.findAll({
				limit: 5,
				raw: true,
				order: [["createdAt", "DESC"]],
			}),
		]);
		const result = {
			page: "Dashboard",
			breadcrumb: [],
			users: {
				title: "users",
				total: usersTotal,
				icon: UsersIcon,
			},
			products: {
				title: "products",
				total: productsTotal,
				icon: ProductsIcon,
			},
			recentsList: [
				{
					title: "Usuarios Nuevos",
					list: usersList,
				},
				{
					title: "Productos Nuevos",
					list: usersList,
				},
			],
		};
		return result;
	}
}
