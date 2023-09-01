import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
	state: () => ({ drawerOpen: true, loginForm: false, registerForm: false }),
	actions: {
		toggle() {
			this.drawerOpen = !this.drawerOpen
		},
		toggleLoginForm() {
			this.loginForm = !this.loginForm;
			this.registerForm = false;
		},
		toggleRegisterForm() {
			this.registerForm = !this.registerForm;
			this.loginForm = false;
		}
	}
})