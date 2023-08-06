import "../css/index.css";
import "./vanilla";
import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
const pinia = createPinia();

for (const el of document.getElementsByClassName("vue-app")) {
	const app = createApp({
		components: {
			HeaderHamburguer: defineAsyncComponent(
				() => import("#/web/components/HeaderHamburguer.vue"),
			),
			HeaderIcos: defineAsyncComponent(
				() => import("#/web/components/HeaderIcos.vue"),
			),
			// admin
			ChevronAsideAdmin: defineAsyncComponent(
				() => import("#/admin/components/ChevronAsideAdmin.vue"),
			),
			ProductsIndex: defineAsyncComponent(
				() => import("#/products/components/ProductsIndex.vue"),
			),
			ProfileHeaderAdmin: defineAsyncComponent(
				() => import("#/auth/components/ProfileHeaderAdmin.vue"),
			),
			ProductFavoriteButton:defineAsyncComponent(()=>import("#/favorites/components/ProductFavoriteButton.vue"))
		},
	});
	app.use(pinia);
	app.use(ToastPlugin);
	app.mount(el);
}
