<template>
	<q-footer elevated class="bg-secondary text-white" :style="{ height: footerHeight }">
		<q-toolbar>
			<!-- <q-btn dense flat round icon="expand_less" /> -->
			<q-btn dense flat round icon="expand_more" @click="drawerStore.toggleFooter()" />
			<q-toolbar-title>
				<div>My cards</div>
			</q-toolbar-title>
		</q-toolbar>
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
	</q-footer>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useDrawerStore } from '../stores/DrawerStore';
import { useUserStore } from '../stores/UserStore';

const drawerStore = useDrawerStore();
const userStore = useUserStore();
const footerHeight = ref();

watch(
	() => drawerStore.footerOpen,
	(value) => {
		if (value == true) {
			footerHeight.value = '400px';
		} else {
			footerHeight.value = '50px';
		}
	}
)

onMounted(() => {
	userStore.getUser();
})

function removeCard(card) {
	console.log(card);
	userStore.updateCards({ "id": card._id, "qty": -1 });
}

</script>