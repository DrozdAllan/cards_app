<template>
	<q-header elevated class="bg-secondary text-white">
		<q-toolbar>
			<q-btn dense flat round icon="menu" @click="drawerStore.toggleDrawer" />

			<q-toolbar-title class="q-ma-xs text-center">
				CARDS_APP
			</q-toolbar-title>
		</q-toolbar>
		<q-tabs align="left" class="text-white" active-color="white" indicator-color="white">
			<q-route-tab to="/search" label="Search" class="text-white" />
			<q-route-tab to="/profile" label="Profile" class="text-white" />
		</q-tabs>
	</q-header>
</template>
<script setup>
import { useDrawerStore } from '../stores/DrawerStore';

const drawerStore = useDrawerStore();
</script>