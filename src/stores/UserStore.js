import { defineStore } from "pinia";
import { Cookies } from "quasar";

export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		name: null,
		cards: []
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
					this.getUserCards();
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
				this.getUserCards();
			} catch (error) {
				console.log(error);
				return error
			}
		},
		disconnect() {
			Cookies.remove("token")
			this.id = null;
			this.name = null;
			this.cards = [];
		},
		async registerUser(email, username, password) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"name": username,
						"password": password,
						"password_confirmation": password,
					}),
				});
				const { _id, token, name } = await response.json();
				Cookies.set('token', token);
				this.id = _id;
				this.name = name;
			} catch (error) {
				return error;
			}
		},
		async getUserCards() {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/cards', {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
				});
				const cards = await response.json();
				this.cards = cards;
			} catch (error) {
				console.log(error);
				return error
			}
		},
		async addCards(request) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/cards', {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
					body: JSON.stringify({
						"cards": [request],
					}),
				});
				const cards = await response.json();
				console.log(cards);
				this.cards = cards;
			} catch (error) {
				console.log(error);
				return error
			}
		},

	}
});