<template>
	<q-drawer v-model="drawerStore.drawerOpen" side="left" overlay bordered>

		<div v-if="userStore.id" class="column flex-center q-pt-xl">
			<span class="text-h6">Hello {{ userStore.name }}</span>
			<q-btn label="Logout" color="secondary" class="" @click="userStore.disconnect" />
		</div>
		<div v-else class="column flex-center q-pt-xl">
			<q-btn v-if="drawerStore.loginForm != true" label="Login" color="secondary" class="q-my-md"
				@click="drawerStore.toggleLoginForm" />
			<LoginForm />
			<q-btn v-if="drawerStore.registerForm != true" label="Register" color="secondary" class="q-my-md"
				@click="drawerStore.toggleRegisterForm" />
			<RegisterForm />
		</div>

	</q-drawer>
</template>
<script setup>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import { useUserStore } from '../stores/UserStore';
import { useDrawerStore } from '../stores/DrawerStore';


const userStore = useUserStore();
const drawerStore = useDrawerStore();


</script>