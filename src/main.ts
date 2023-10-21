import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import { createVuestic } from 'vuestic-ui'
import { firebase } from './firebase'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(createVuestic())

app.mount('#app')
