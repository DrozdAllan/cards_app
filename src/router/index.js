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
			path: "/profile",
			component: () => import("../views/Profile.vue"),
			name: "profile",
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: { name: 'home' }
		},
	],
});

export default router;
