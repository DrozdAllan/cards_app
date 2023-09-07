<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin" style="width: 600px;">
			<!--
		  ...content
		  ... use q-card-section for it?
		-->
			<q-card-section class="text-center">
				{{ props.deck.name }}
			</q-card-section>
			<q-card-section>
				<div class="row">
					<div class="col">
						<q-scroll-area style="height: 400px;">
							<q-list dense padding class="rounded-borders">
								<q-item v-for="deckCard in deck.cards" clickable v-ripple @click="toCards(deckCard._id)">
									<q-item-section>
										{{ deckCard.name }} ({{ deckCard.quantity }})
									</q-item-section>
									<q-item-section avatar>
										<q-icon color="primary" name="chevron_right" />
									</q-item-section>
								</q-item>
							</q-list>
						</q-scroll-area>
					</div>
					<div class="col">
						<q-scroll-area style="height: 400px;">
							<q-list dense padding class="rounded-borders">
								<q-item v-for="allCard in userStore.cards" clickable v-ripple @click="toDeck(allCard)">
									<q-item-section avatar>
										<q-icon color="primary" name="chevron_left" />
									</q-item-section>
									<q-item-section>
										{{ allCard.name }} ({{ allCard.quantity }})
									</q-item-section>
								</q-item>
							</q-list>
						</q-scroll-area>
					</div>
				</div>
			</q-card-section>
			<!-- buttons example -->
			<q-card-actions align="right">
				<q-btn color="secondary" label="Save" @click="onOKClick" />
				<q-btn color="warning" label="Cancel" @click="onDialogCancel" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
  
<script setup>
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar'
import { useUserStore } from '../stores/UserStore';

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const props = defineProps(['deck'])
const userStore = useUserStore();

const deck = ref(props.deck);
const cards = ref(userStore.cards);
// console.log(deck.value, cards.value);

function toCards(cardId) {
	console.log(cardId);
	const newDeck = deck.value.cards.filter((card) => card._id !== cardId);
	console.log(newDeck);
	deck.value.cards = newDeck;
}

function toDeck(allCard) {
	console.log(allCard);
	deck.value.cards.push(allCard);
}


// this is part of our example (so not required)
function onOKClick() {
	console.log('SALUT');
	// TODO: PUT/updateDeck in UserStore
	// on OK, it is REQUIRED to
	// call onDialogOK (with optional payload)
	onDialogOK()
	// or with payload: onDialogOK({ ... })
	// ...and it will also hide the dialog automatically
}
</script>