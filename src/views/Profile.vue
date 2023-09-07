<template>
	<q-page padding>
		<div v-if="userStore.id">
			<div class="text-bold">Your decks</div>
			<div class="row">
				<div v-if="userStore.decks == []"> No deck found</div>
				<div v-else v-for="deck in userStore.decks">

					<q-chip color="secondary" text-color="white" clickable @click="modifyDeck(deck)" :label="deck.name" />
				</div>
				<q-chip color="secondary" text-color="white" label="+" />
				<q-form class="q-pa-md bordered" ref="loginForm">
					<q-input v-model="deckName" label="Deck Name" filled />
					<div class="flex flex-center">
						<q-btn color="secondary" @click="createDeck()">create deck</q-btn>
					</div>
				</q-form>
			</div>

		</div>
		<div v-else>
			You need to <q-btn color="secondary" dense class="text-lowercase"
				@click="drawerStore.toggleDrawer">login</q-btn>
			to see your profile
		</div>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '../stores/UserStore';
import { useDrawerStore } from '../stores/DrawerStore';
import DeckDialog from '../components/DeckDialog.vue';

const userStore = useUserStore();
const drawerStore = useDrawerStore();
const $q = useQuasar();

const deckName = ref(null);

function createDeck() {
	userStore.createNewDeck(deckName.value);
	deckName.value = null;
}

function modifyDeck(deck) {
	$q.dialog({
		component: DeckDialog,
		componentProps: {
			deck: deck,
		}
	}).onOk(() => {
		console.log('OK')
	}).onCancel(() => {
		console.log('CANCEL')
	}).onDismiss(() => {
		console.log('DISMISS')
	})
}

onMounted(() => {
	userStore.getUser();
	userStore.getUserDecks();
})
</script>
<style>
.bordered {
	border: solid 1px;
}
</style>