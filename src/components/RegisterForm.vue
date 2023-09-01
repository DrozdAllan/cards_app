<template>
	<transition enter-active-class="animated backInRight" leave-active-class="animated backOutRight faster">
		<q-form ref="registerForm" class="q-pa-md" v-if="drawerStore.registerForm">
			<q-input v-model="email" label="Email" type="email" filled lazy-rules="ondemand" :rules="emailRules"
				@click="hasError = false" @keydown.enter="validateRegister" />
			<q-input v-model="username" label="Username" filled lazy-rules="ondemand" :rules="usernameRules"
				@click="hasError = false" @keydown.enter="validateRegister" />
			<q-input v-model="password" label="Password" filled lazy-rules="ondemand" :rules="passwordRules"
				@click="hasError = false" @keydown.enter="validateRegister" :type="isPwd ? 'password' : 'text'">
				<template v-slot:append>
					<q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
						@click="isPwd = !isPwd" />
				</template>
			</q-input>

			<div class="flex flex-center">
				<q-btn :disable="hasError" label="Register" color="primary" @click="validateRegister" />
			</div>
		</q-form>
	</transition>
</template>

<script setup>
import { ref } from "vue";
import { useDrawerStore } from "../stores/DrawerStore";

import '@quasar/extras/animate/backInRight.css'
import '@quasar/extras/animate/backOutRight.css'

const drawerStore = useDrawerStore();
const registerForm = ref(null)
const hasError = ref(false)
const email = ref('')
const username = ref('')
const password = ref('')
const isPwd = ref(true)


const emailRules = [
	(v) => !!v || "Required",
	(v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const usernameRules = [
	(v) => !!v || "Required",
	(v) => v.length >= 5 || "Min 5 characters",
];

const passwordRules = [
	(v) => !!v || "Required",
	(v) => v.length >= 6 || "Min 6 characters",
]

async function validateRegister() {
	// TODO: fetch
	// const success = await registerForm.value.validate();
	// if (success) {
	// 	axios
	// 		.post("/register", {
	// 			email: email.value,
	// 			name: username.value,
	// 			password: password.value,
	// 			password_confirmation: password.value,
	// 		})
	// 		.then((Response) => {
	// 			if (Response.status == 201) {
	// 				axios
	// 					.post("/login", {
	// 						name: username.value,
	// 						password: password.value
	// 					})
	// 					.then((Response) => {
	// 						location.reload();
	// 					});
	// 			}
	// 		})
	// } else {
	// 	console.log('form failure')
	// 	hasError.value = true;
	// }
}
</script>