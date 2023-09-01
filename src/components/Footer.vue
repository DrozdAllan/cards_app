<template>
	<q-footer elevated class="bg-grey-8 text-white">
		<q-toolbar>
			<q-toolbar-title>
				<div>CARDS_APP</div>
				<q-btn @click="drawerStore.toggle()">
					Login || Your Cards
				</q-btn>
			</q-toolbar-title>
		</q-toolbar>
	</q-footer>
</template>
<script setup>
import { useDrawerStore } from '../stores/DrawerStore';

const drawerStore = useDrawerStore();
</script>