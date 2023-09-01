import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Cookies } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './css/style.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia();
const myApp = createApp(App)

myApp.use(Quasar, {
	plugins: {
		Notify,
		Cookies
	}, // import Quasar plugins and add here
}).use(router).use(pinia)

myApp.mount('#app')