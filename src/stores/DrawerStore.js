import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
	state: () => ({ loginForm: false, registerForm: false }),
	actions: {
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