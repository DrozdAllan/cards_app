import { defineStore } from "pinia";
import { Cookies } from "quasar";

export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		name: null,
		cards: [],
		decks: []
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
				console.log(error);
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
				this.cards = await response.json();
			} catch (error) {
				console.log(error);
				return error
			}
		},
		async updateCards(request) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/cards', {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
					body: JSON.stringify({
						"cards": request,
					}),
				});
				this.cards = await response.json();
			} catch (error) {
				console.log(error);
				return error
			}
		},
		async getUserDecks() {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/decks', {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
				});
				this.decks = await response.json();
			} catch (error) {
				console.log(error);
				return error
			}
		},
		async createNewDeck(deckName) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/decks', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
					body: JSON.stringify({
						"name": deckName,
						"cards": [],
					}),
				});
				this.decks = await response.json();
			} catch (error) {
				console.log(error);
				return error
			}
		},
		async updateDeck(deckId, cardss) {
			// format to request to use cardsComparator in backend
			// const formattedRequest = [];
			// await cardss.forEach((card) => formattedRequest.push({ "id": card._id, "qty": card.quantity }));
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/decks', {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + Cookies.get("token"),
					},
					body: JSON.stringify({
						"deckId": deckId,
						"cards": cardss,
					}),
				});
				const result = await response.json();
				console.log(result);
				// const modifiedDeckId = this.decks.indexOf(_id == deckId);
				// this.decks[modifiedDeckId] = result;
			} catch (error) {
				console.log(error);
				return error
			}
		},
	}
});