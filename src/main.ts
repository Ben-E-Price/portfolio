import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import toHeading from '@/directives/to-heading.ts'

const app = createApp(App)
app.use(createPinia())
app.directive('to-heading', toHeading)

app.mount('#app')
