<template>
	<q-header elevated class="bg-secondary text-white" style="">
		<q-toolbar>
			<q-btn dense flat round icon="menu" @click="drawerStore.toggleDrawer" />

			<q-toolbar-title class="q-ma-xs">
				CARDS_APP
			</q-toolbar-title>
		</q-toolbar>
		<q-tabs align="left" class="text-white" active-color="white" indicator-color="white">
			<q-route-tab to="/" label="Search" class="text-white" />
			<q-route-tab to="/profile" label="Profile" class="text-white" />
		</q-tabs>
	</q-header>
</template>
<script setup>
import { useDrawerStore } from '../stores/DrawerStore';

const drawerStore = useDrawerStore();


</script>