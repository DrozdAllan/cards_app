<template>
	<q-drawer show-if-above side="right" persistent bordered>
		<!-- drawer content -->
		<div class="q-pt-xl">
			<div v-if="userStore.id" class="q-py-md">
				Bienvenue {{ userStore.name }} <br>
				<q-btn label="Logout" color="secondary" class="q-ma-md" @click="userStore.disconnect" />
				<div>
					<div class="text-bold">Your cards</div>
					<div class="q-pa-md" style="max-width: 350px">
						<q-list bordered separator>
							<q-item v-for="card in userStore.cards" clickable v-ripple>
								<q-item-section>
									<q-item-label>{{ card.name }}</q-item-label>
									<q-item-label caption>{{ card.quantity }}</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</div>
				</div>
			</div>
			<div v-else>
				<q-btn v-if="drawerStore.loginForm != true" label="Login" color="primary"
					@click="drawerStore.toggleLoginForm" /> <br>
				<LoginForm /> <br>
				<q-btn v-if="drawerStore.registerForm != true" label="Register" color="primary"
					@click="drawerStore.toggleRegisterForm" /> <br>
				<RegisterForm />
			</div>
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