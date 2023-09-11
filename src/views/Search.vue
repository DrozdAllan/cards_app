<template>
	<q-page padding>
		<q-input bg-color="white" class="q-ma-md" outlined v-model="cardName" label="Search for a card by name"
			@keyup="searchCard" />

		<div class="row justify-around q-gutter-md">

			<card-component v-for="card in cards" :card="card" />

		</div>
	</q-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useSearchStore } from '../stores/SearchStore';
import CardComponent from '../components/CardComponent.vue';

const cards = ref([]);
const searchStore = useSearchStore();
const cardName = ref();
const searchTimer = ref(null)

function searchCard() {
	// Clear any existing timers
	clearTimeout(searchTimer.value);

	// Set a new timer with a delay (e.g., 500 milliseconds)
	searchTimer.value = setTimeout(() => {
		// Call your search function here
		performSearch();
	}, 500);
}

async function performSearch() {
	// Your search logic goes here
	if (cardName.value.length > 8) {
		searchStore.performSearch(cardName.value);
	}
}

onMounted(async () => {
	try {
		const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '/cards', {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});
		cards.value = await response.json();
	} catch (error) {
		console.log(error);
		return error
	}
})

watch(
	() => searchStore.cards,
	(response) => {
		console.log(response);
		cards.value = response;
	}
)
</script>