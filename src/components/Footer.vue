<template>
	<q-footer elevated class="bg-secondary text-white">
		<q-expansion-item switch-toggle-side label="My Cards">
			<div class="q-pa-md bg-white">

				<q-chip v-for="card in userStore.cards" clickable outline color="secondary" v-ripple
					@click="removeCard(card)">
					<span>{{ card.name }} ({{ card.quantity }})</span>
					<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" class="text-black">
						<card-component :card="card" />
					</q-tooltip>
				</q-chip>

			</div>
		</q-expansion-item>
	</q-footer>
</template>
<script setup>
import CardComponent from '../components/CardComponent.vue';
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore();

function removeCard(card) {
	console.log(card);
	userStore.updateCards([{ "id": card._id, "qty": -1 }]);
}
</script>