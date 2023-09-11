<template>
	<q-card class="custom-card q-pa-sm">

		<div class="text-uppercase text-left text-bold text-no-wrap" style="letter-spacing: -0.5px; font-size: 0.8em;">{{
			card.name }}</div>

		<div class="row justify-end">
			<q-icon v-if="card.level >= 1" v-for="n in card.level" name="star_border" />
			<q-space v-else class="q-py-sm" />
		</div>

		<q-img src="https://placehold.co/220x240" placeholder="/path/to/placeholder-image.jpg" fit="none" />

		<div class="text-left" style="height: 100px;">
			<div class="text-subtitle2">[{{ card.type }}]</div>
			<span class="line-clamp">
				{{ card.desc }}
			</span>
		</div>

		<div class="text-right">
			<span v-if="card.atk != null">
				ATK / {{ card.atk }} DEF / {{ card.def }}
			</span>
			<q-btn v-if="userStore.id" icon="favorite" size="xs" class="q-mb-xs" color="secondary" flat round dense
				@click="addCard(card)" />
		</div>

	</q-card>
</template>
<script setup>
const props = defineProps(['card'])
const card = props.card

import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore();

function addCard(card) {
	console.log(card);
	userStore.updateCards([{ "id": card._id, "qty": 1 }]);
}
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
	height: 430px;
	line-height: normal;
}
</style>