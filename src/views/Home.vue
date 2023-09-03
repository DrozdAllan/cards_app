<template>
	<q-page padding>
		<div class="row">
			<div v-for="card in cards" class="col-3">
				<q-card>
					<q-card-section>
						<div class="text-h6">{{ card.name }}</div>
						<div class="text-subtitle2">{{ card.type }}</div>
					</q-card-section>

					<q-card-section class="ellipsis-2-lines">
						{{ card.desc }}
					</q-card-section>

					<q-separator dark />

					<q-card-actions>
						<q-btn flat>{{ card.atk }}</q-btn>
						<q-btn flat>{{ card.def }}</q-btn>
					</q-card-actions>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cards = ref([]);

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

</script>