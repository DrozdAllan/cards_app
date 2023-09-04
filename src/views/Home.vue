<template>
	<q-page padding>
		<div class="row">
			<div v-for="card in cards" class="q-ma-md">
				<q-card class='theCard'>

					<div class="text-caption text-no-wrap">{{ card.name }}</div>
					<q-img src="https://placehold.co/220x210" placeholder="/path/to/placeholder-image.jpg" fit="none" />
					<div class="text-left q-ml-sm">
						<div class="text-bold">[{{ card.type }}]</div>
						<p class="line-clamp q-pa-none q-ma-none">
							{{ card.desc }}
						</p>
					</div>
					<div class="row justify-end">
						<div v-if="userStore.id"><q-btn icon="favorite" size="xs" flat round dense @click="addCard(card)" />
						</div>
						<div v-if="card.atk != null">
							<span>atk: {{ card.atk }}</span>
							<span class="q-mx-xs">def: {{ card.def }}</span>
						</div>
					</div>
				</q-card>
			</div>
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

function addCard(card) {
	console.log(card);
	userStore.updateCards({ "id": card._id, "qty": 1 });
}

</script>
<style>
.line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
	overflow: hidden;
	font-size: 0.8em;
}

.theCard {
	width: 250px;
	height: 400px;
}

.theStats {
	position: absolute;
	bottom: 0;
}
</style>