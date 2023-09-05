<template>
	<q-page padding>
		<div class="q-pa-md row q-gutter-md">

			<q-card v-for="card in cards" class="my-card q-pa-sm">

				<div class="text-uppercase text-left text-bold text-no-wrap q-pl-sm q-pb-xs"
					style="letter-spacing: -0.5px; font-size: 0.8em;">{{ card.name }}</div>

				<div class="row justify-end q-pr-sm">
					<q-icon v-if="card.level >= 1" v-for="n in card.level" name="star" />
					<q-space v-else class="q-py-sm"></q-space>
				</div>

				<q-img src="https://placehold.co/220x210" placeholder="/path/to/placeholder-image.jpg" fit="none" />

				<div class="column" style="height: 235px;">
					<div class="col q-mx-sm text-left">
						<div class="text-subtitle2">[{{ card.type }}]</div>
						<p class="line-clamp">
							{{ card.desc }}
						</p>
					</div>

					<div class="col self-end">
						<q-btn v-if="userStore.id" icon="favorite" size="xs" flat round dense @click="addCard(card)" />

						<span v-if="card.atk != null">
							ATK / {{ card.atk }} DEF / {{ card.def }}
						</span>
					</div>

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
	-webkit-line-clamp: 7;
	-webkit-box-orient: vertical;
	overflow: hidden;
	font-size: 0.7em;
}

.my-card {
	width: 250px;
	height: 400px;
	line-height: normal;
}
</style>