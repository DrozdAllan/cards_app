<template>
	<q-drawer v-model="drawerStore.drawerOpen" side="left" overlay bordered class="q-pa-md">

		<div v-if="userStore.id">
			<span class="text-h6">Hello {{ userStore.name }} </span><br>
			<q-btn label="Logout" color="secondary" class="q-ma-md" @click="userStore.disconnect" />
			<div>

			</div>
		</div>
		<div v-else>
			<q-btn v-if="drawerStore.loginForm != true" label="Login" color="secondary"
				@click="drawerStore.toggleLoginForm" /> <br>
			<LoginForm /> <br>
			<q-btn v-if="drawerStore.registerForm != true" label="Register" color="secondary"
				@click="drawerStore.toggleRegisterForm" /> <br>
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