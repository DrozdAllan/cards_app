<template>
	<q-layout view="hHh lpR fFr">

		<Drawer />

		<q-page-container>
			<router-view />
		</q-page-container>

		<Footer />

	</q-layout>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Drawer from './components/Drawer.vue';

</script>