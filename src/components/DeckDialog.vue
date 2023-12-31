<template>
	<q-dialog full-width ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">

			<q-card-section class="text-center">
				{{ props.deck.name }}
			</q-card-section>
			<q-card-section>
				<div class="row">
					<div class="col">
						<q-scroll-area style="height: 600px;">

							<q-list bordered separator dense @drop="onDeckDrop($event)" @dragenter.prevent
								@dragover.prevent>
								<q-item v-for="card in sortedDeck" :key="card._id" clickable v-ripple draggable="true"
									@click="toCards(card._id)" @dragstart="startDrag($event, card._id)">
									<q-item-section>
										{{ card.name }} ({{ card.quantity }})
									</q-item-section>
									<q-item-section avatar>
										<q-icon color="primary" name="chevron_right" />
									</q-item-section>
									<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
										class="text-black">
										<card-component :card="card" />
									</q-tooltip>
								</q-item>
							</q-list>
						</q-scroll-area>
					</div>
					<div class="col">
						<q-scroll-area style="height: 600px;">
							<q-list bordered separator dense @drop="onCardsDrop($event)" @dragenter.prevent
								@dragover.prevent>
								<q-item v-for="card in sortedCards" :key="card._id" clickable v-ripple draggable="true"
									@click="toDeck(card._id)" @dragstart="startDrag($event, card._id)">
									<q-item-section avatar>
										<q-icon color="primary" name="chevron_left" />
									</q-item-section>
									<q-item-section>
										{{ card.name }} ({{ card.quantity }})
									</q-item-section>
									<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
										class="text-black">
										<card-component :card="card" />
									</q-tooltip>
								</q-item>
							</q-list>
						</q-scroll-area>
					</div>
				</div>
			</q-card-section>
			<q-card-actions align="right">
				<q-btn color="secondary" label="Save" @click="onOKClick" />
				<q-btn color="warning" label="Cancel" @click="onCancel" />
			</q-card-actions>

		</q-card>
	</q-dialog>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar'
import { useUserStore } from '../stores/UserStore'
import CardComponent from '../components/CardComponent.vue';

defineEmits([
	...useDialogPluginComponent.emits
])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const props = defineProps(['deck', 'cards'])
const userStore = useUserStore();

const deck = ref(props.deck);
const userCards = ref(props.cards);

const sortedDeck = computed(() => {
	return deck.value.cards.sort((a, b) => {
		const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	});
})

const sortedCards = computed(() => {
	return userCards.value.sort((a, b) => {
		const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	});
})


function startDrag(event, cardID) {
	event.dataTransfer.setData('cardID', cardID)
}

function onCardsDrop(event) {
	const cardID = event.dataTransfer.getData('cardID')
	toCards(cardID)
}

function onDeckDrop(event) {
	const cardID = event.dataTransfer.getData('cardID')
	toDeck(cardID)
}

function toCards(cardId) {
	// In user : quantity + 1 if card exists OR push card if card doesn't exist
	const userCard = userCards.value.find((card) => card._id == cardId);
	if (userCard) {
		userCard.quantity++;
	} else {
		// spread operator to unref
		let qty1 = { ...deckCard };
		qty1.quantity = 1;
		userCards.value.push(qty1);
	}
	// In deck : quantity - 1 if card.quantity > 1 OR filter card if card.quantity = 1
	const deckCard = deck.value.cards.find((card) => card._id == cardId);
	if (deckCard.quantity > 1) {
		deckCard.quantity--;
	} else {
		deck.value.cards = deck.value.cards.filter((card) => card._id != cardId);
	}
}

function toDeck(cardId) {
	// In deck : quantity + 1 if card exists OR push card if card doesn't exist
	const deckCard = deck.value.cards.find((card) => card._id == cardId);
	if (deckCard) {
		if (deckCard.quantity < 3) {
			deckCard.quantity++;
		} else {
			return
		}
	} else {
		// spread operator to unref
		let qty1 = { ...userCard };
		qty1.quantity = 1;
		deck.value.cards.push(qty1);
	}
	// In user : quantity - 1 if card.quantity > 1 OR filter card if card.quantity = 1
	const userCard = userCards.value.find((card) => card._id == cardId);
	if (userCard.quantity > 1) {
		userCard.quantity--;
	} else {
		userCards.value = userCards.value.filter((card) => card._id != cardId);
	}
}

// this is part of our example (so not required)
function onOKClick() {
	userStore.updateDeck(deck.value._id, deck.value.cards);
	// on OK, it is REQUIRED to
	// call onDialogOK (with optional payload)
	onDialogOK()
	// or with payload: onDialogOK({ ... })
	// ...and it will also hide the dialog automatically
}

function onCancel() {
	onDialogCancel();
}
</script>