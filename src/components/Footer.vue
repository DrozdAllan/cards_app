<template>
	<q-footer elevated class="bg-secondary text-white">
		<q-expansion-item switch-toggle-side label="My Cards">
			<div class="q-pa-md bg-white">

				<q-chip v-for="card in userStore.cards" clickable v-ripple @click="removeCard(card)">
					<span>{{ card.name }} ({{ card.quantity }})</span>
				</q-chip>

			</div>
		</q-expansion-item>
	</q-footer>
</template>
<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();

onMounted(() => {
	// userStore.getUser();
})

function removeCard(card) {
	console.log(card);
	userStore.updateCards([{ "id": card._id, "qty": -1 }]);
}
</script>