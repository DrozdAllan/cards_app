import { defineStore } from "pinia";
import { Cookies } from "quasar";



export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		name: null,
	}),
	actions: {
		async getUser() {
			// CHECK IF COOKIE WITH TOKEN EXISTS
			let token_cookie = Cookies.has("token");
			if (token_cookie) {
				// CONNECT USER FROM TOKEN
				try {
					const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/me', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + Cookies.get("token"),
						}
					});
					const { _id, name } = await response.json();
					this.id = _id;
					this.name = name;
				} catch (error) {
					console.log(error);
					return error
				}
			} else {
				console.log('no token cookie');
			}
		},
		async loginUser(email, password) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/login', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "email": email, "password": password })
				});
				const { _id, token, name } = await response.json();
				Cookies.set('token', token);
				this.id = _id;
				this.name = name;
			} catch (error) {
				console.log(error);
				return error
			}
		},
		disconnect() {
			Cookies.remove("token")
			this.id = null;
			this.name = null;
		}
	}
})