<template>
	<q-layout view="hhh lpR fFf">

		<Drawer />

		<q-page-container>
			<router-view />
		</q-page-container>

		<Header />

		<Footer v-if="userStore.id" />

	</q-layout>
</template>

<script setup>
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/UserStore';

const userStore = useUserStore();

onMounted(() => {
	userStore.getUser();
})
</script>