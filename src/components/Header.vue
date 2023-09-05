<template>
	<q-header elevated class="bg-grey-8 text-white" style="">
		<q-toolbar>
			<q-toolbar-title class="q-ma-xs">
				<q-input bg-color="white" outlined v-model="cardName" label="Search for a card by name"
					@keyup="searchCard" />
			</q-toolbar-title>
		</q-toolbar>
	</q-header>
</template>
<script setup>
import { ref } from 'vue';
import { useSearchStore } from '../stores/SearchStore';

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
</script>