<template>
	<q-layout view="hHr lpR fFr">

		<Drawer />

		<q-page-container>
			<router-view />
		</q-page-container>

		<Header />

	</q-layout>
</template>

<script setup>
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

</script>