<template>
	<q-page padding>
		<q-input bg-color="white" class="q-ma-md" outlined v-model="cardName" label="Search for a card by name"
			@keyup="searchCard" />

		<div class="row justify-around q-gutter-md">
			<q-card v-for="card in cards" class="custom-card q-pa-sm">

				<div class="text-uppercase text-left text-bold text-no-wrap"
					style="letter-spacing: -0.5px; font-size: 0.8em;">{{ card.name }}</div>

				<div class="row justify-end">
					<q-icon v-if="card.level >= 1" v-for="n in card.level" name="star_border" />
					<q-space v-else class="q-py-sm" />
				</div>

				<q-img src="https://placehold.co/220x240" placeholder="/path/to/placeholder-image.jpg" fit="none" />

				<div class="text-left" style="height: 75px;">
					<div class="text-subtitle2">[{{ card.type }}]</div>
					<span class="line-clamp">
						{{ card.desc }}
					</span>
				</div>

				<div class="text-right">
					<span v-if="card.atk != null">
						ATK / {{ card.atk }} DEF / {{ card.def }}
					</span>
					<q-btn v-if="userStore.id" icon="favorite" size="xs" class="q-mb-xs" color="secondary" flat round dense @click="addCard(card)" />
				</div>

			</q-card>

		</div>
	</q-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useSearchStore } from '../stores/SearchStore';
import { useUserStore } from '../stores/UserStore';

const cards = ref([]);
const searchStore = useSearchStore();
const userStore = useUserStore();
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

function addCard(card) {
	console.log(card);
	userStore.updateCards([{ "id": card._id, "qty": 1 }]);
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
<style>
.line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
	font-size: 0.7em;
}

.custom-card {
	width: 260px;
	height: 400px;
	line-height: normal;
}
</style>