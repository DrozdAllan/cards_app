import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
	state: () => ({ drawerOpen: false, loginForm: false, registerForm: false, footerOpen: false }),
	actions: {
		toggleDrawer() {
			this.drawerOpen = !this.drawerOpen;
		},
		toggleLoginForm() {
			this.loginForm = !this.loginForm;
			this.registerForm = false;
		},
		toggleRegisterForm() {
			this.registerForm = !this.registerForm;
			this.loginForm = false;
		},
		toggleFooter() {
			this.footerOpen = !this.footerOpen;
		},
	}
})