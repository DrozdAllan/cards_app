<template>
	<q-layout view="hHh lpR fFf">

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