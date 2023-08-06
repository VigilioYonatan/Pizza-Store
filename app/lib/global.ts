import { UsersIcon } from "./icos";

export const global = {
	webUris: [
		{
			uri: "/",
			title: "Home",
		},
		{
			uri: "/shop",
			title: "Shop",
		},
		{
			uri: "/nosotros",
			title: "Nosotros",
		},
		{
			uri: "/blog",
			title: "Blog",
		},
	],
	adminRouters: [
		{
			uri: "/admin/users",
			title: "users",
			ico: UsersIcon,
			children: [
				{
					title: "crear",
					uri: "/admin/users/create",
				},
			],
		},
		{
			uri: "/admin/products",
			title: "products",
			ico: UsersIcon,
			children: [
				{
					title: "crear",
					uri: "/admin/products/create",
				},
			],
		},
	],
};
