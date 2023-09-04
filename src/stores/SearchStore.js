import { defineStore } from "pinia";

export const useSearchStore = defineStore('search', {
	state: () => ({
		cards: []
	}),
	actions: {
		async performSearch(cardName) {
			try {
				const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/cards', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"cardName": cardName
					})
				});
				this.cards = await response.json();
			} catch (error) {
				console.log(error);
				return error
			}
		}
	},
});