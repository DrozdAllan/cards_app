<template>
	<q-drawer show-if-above v-model="drawerStore.drawerOpen" side="right" bordered>
		<!-- drawer content -->
		<div v-if="userStore.id">
			COUCOU {{ userStore.name }} <br>
			<q-btn label="Logout" color="primary" @click="userStore.disconnect" />
		</div>
		<div v-else>
			<q-btn label="Login" color="primary" @click="drawerStore.toggleLoginForm" /> <br>
			<LoginForm /> <br>
			<q-btn label="Register" color="primary" @click="drawerStore.toggleRegisterForm" /> <br>
			<RegisterForm />
		</div>
	</q-drawer>
</template>
<script setup>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useDrawerStore } from '../stores/DrawerStore';


const userStore = useUserStore();
const drawerStore = useDrawerStore();


onMounted(() => {
	userStore.getUser();
})
</script>