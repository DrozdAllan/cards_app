<template>
	<q-page>
		<div v-if="userStore.id">
			<div class="text-h4 q-pb-md">Your decks</div>
			<div v-if="userStore.decks == []"> No deck found</div>
			<div v-else class="row justify-between">
				<div class="col-8 row q-gutter-sm">
					<div v-for="deck in userStore.decks">
						<q-card class="deck-card">
							<q-card-section>
								<span class="text-h6">{{ deck.name }}</span>
							</q-card-section>
							<q-card-section>
								deck description
							</q-card-section>
							<q-card-actions align="around">
								<q-btn flat @click="modifyDeck(deck)" class="text-primary">modify</q-btn>
								<q-btn flat @click="deleteDeck(deck)" class="text-red">delete</q-btn>
							</q-card-actions>
						</q-card>
					</div>
				</div>
				<div class="col-4">
					<q-form class="q-pa-md bordered" ref="loginForm">
						<q-input v-model="deckName" label="New Deck Name" filled />
						<q-btn class="q-mt-md" color="secondary" @click="createDeck()">create new deck</q-btn>
					</q-form>
				</div>
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

function deleteDeck() {
	// TODO: deleteDeck in backend
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

.deck-card {
	width: 250px;
	height: 170px;
	line-height: normal;
}
</style>
