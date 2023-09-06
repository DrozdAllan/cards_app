<template>
	<q-page padding>
		<div v-if="userStore.id" class="row justify-between">

			<div>
				<div class="text-bold">Your decks</div>
				No deck found, create deck
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
import { onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useDrawerStore } from '../stores/DrawerStore';

const userStore = useUserStore();
const drawerStore = useDrawerStore();

onMounted(() => {
	userStore.getUser();
})
</script>