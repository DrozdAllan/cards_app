<template>
	<transition enter-active-class="animated backInLeft" leave-active-class="animated backOutLeft faster">
		<q-form v-if="drawerStore.loginForm" class="q-pa-md bordered" ref="loginForm">
			<q-input v-model="email" label="Email" filled lazy-rules="ondemand" :rules="emailRules"
				@click="hasError = false" @keydown.enter="validateLogin" />
			<q-input v-model="password" label="Password" filled lazy-rules="ondemand" :rules="passwordRules"
				@click="hasError = false" @keydown.enter="validateLogin" :type="isPwd ? 'password' : 'text'">
				<template v-slot:append>
					<q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
						@click="isPwd = !isPwd" />
				</template>
			</q-input>

			<div class="flex flex-center">
				<q-btn :disable="hasError" label="Login" color="secondary" @click="validateLogin" />
			</div>
		</q-form>
	</transition>
</template>
  
<script setup>
import { ref } from "vue";
import { useDrawerStore } from "../stores/DrawerStore";
import { useUserStore } from "../stores/UserStore";

import '@quasar/extras/animate/backInLeft.css'
import '@quasar/extras/animate/backOutLeft.css'

const drawerStore = useDrawerStore();
const userStore = useUserStore();
const loginForm = ref(null)
const hasError = ref(false)
const email = ref('')
const password = ref('')
const isPwd = ref(true)

const emailRules = [
	(v) => !!v || "Required",
	(v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const passwordRules = [
	(v) => !!v || "Required",
	(v) => v.length >= 6 || "Min 6 characters",
]

async function validateLogin() {
	const success = await loginForm.value.validate();
	if (success) {
		userStore.loginUser(email.value, password.value);
	}
}
</script>
<style>
.bordered{
	border: solid 1px;
}</style>