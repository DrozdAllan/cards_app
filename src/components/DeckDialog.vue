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

							<draggable :list="deck.cards" group="same-group" @start="drag = true" @end="drag = false"
								item-key="id">
								<template #item="{ element }">
									<q-item dense clickable class="bordered-item" v-ripple @click="toCards(element._id)">
										<q-item-section>
											{{ element.name }} ({{ element.quantity }})
										</q-item-section>
										<q-item-section avatar>
											<q-icon color="primary" name="chevron_right" />
										</q-item-section>
										<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
											class="text-black">
											<card-component :card="element" />
										</q-tooltip>
									</q-item>
								</template>
							</draggable>
						</q-scroll-area>
					</div>
					<div class="col">
						<q-scroll-area style="height: 600px;">
							<draggable :list="userCards" group="same-group" @start="drag = true" @end="drag = false"
								item-key="id">
								<template #item="{ element }">
									<q-item dense clickable class="bordered-item" v-ripple @click="toDeck(element._id)">
										<q-item-section avatar>
											<q-icon color="primary" name="chevron_left" />
										</q-item-section>
										<q-item-section>
											{{ element.name }} ({{ element.quantity }})
										</q-item-section>
										<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
											class="text-black">
											<card-component :card="element" />
										</q-tooltip>
									</q-item>
								</template>
							</draggable>
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
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar'
import { useUserStore } from '../stores/UserStore'
import draggable from 'vuedraggable'
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
const drag = ref(false);

function toCards(cardId) {
	// In deck : quantity - 1 if card.quantity > 1 OR filter card if card.quantity = 1
	const deckCard = deck.value.cards.find((card) => card._id == cardId);
	if (deckCard.quantity > 1) {
		deckCard.quantity--;
	} else {
		const newDeck = deck.value.cards.filter((card) => card._id !== cardId);
		deck.value.cards = newDeck;
	}
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
}

function toDeck(cardId) {
	// In user : quantity - 1 if card.quantity > 1 OR filter card if card.quantity = 1
	const userCard = userCards.value.find((card) => card._id == cardId);
	if (userCard.quantity > 1) {
		userCard.quantity--;
	} else {
		const newDeck = userCards.value.filter((card) => card._id !== cardId);
		userCards.value = newDeck;
	}
	// In deck : quantity + 1 if card exists OR push card if card doesn't exist
	const deckCard = deck.value.cards.find((card) => card._id == cardId);
	if (deckCard) {
		deckCard.quantity++;
	} else {
		// spread operator to unref
		let qty1 = { ...userCard };
		qty1.quantity = 1;
		deck.value.cards.push(qty1);
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
<style scoped>
.bordered-item {
	border: solid rgba(0, 0, 0, 0.12) 1px;
	border-radius: 2px;
	margin-bottom: 2px;
	margin-left: 1px;
	margin-right: 1px;
}
</style>