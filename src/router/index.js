import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/search",
			component: () => import("../views/Search.vue"),
			name: "search",
		},
		{
			path: "/profile",
			component: () => import("../views/Profile.vue"),
			name: "profile",
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: { name: 'search' }
		},
	],
});

export default router;
