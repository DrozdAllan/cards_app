<template>
	<q-page padding>
		<div v-if="userStore.id" class="row justify-between">
			<div class="col-4">
				<div class="text-bold">Your cards</div>
				<div class="q-pa-md">
					<q-list bordered separator>
						<q-item v-for="card in userStore.cards" clickable v-ripple @click="removeCard(card)">
							<q-item-section>
								<q-item-label>{{ card.name }}</q-item-label>
								<q-item-label caption>{{ card.quantity }}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</div>
			</div>
			<div class="col-4">
				<div class="text-bold">Your decks</div>
				No deck found, create deck
			</div>
		</div>
		<div v-else>
			You need to <q-btn color="secondary" dense class="text-lowercase" @click="drawerStore.toggleDrawer">login</q-btn>
			to see your profile
		</div>
	</q-page>
</template>
<script setup>
// import LoginForm from './LoginForm.vue';
// import RegisterForm from './RegisterForm.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useDrawerStore } from '../stores/DrawerStore';

const userStore = useUserStore();
const drawerStore = useDrawerStore();

onMounted(() => {
	userStore.getUser();
})

function removeCard(card) {
	console.log(card);
	userStore.updateCards({ "id": card._id, "qty": -1 });
}
</script>