import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("../views/Home.vue"),
			name: "home",
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: { name: 'home' }
		},
	],
});

export default router;
