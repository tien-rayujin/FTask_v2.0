import { createApp } from 'vue'
import App from './App.vue'
import store from './stores'
import router from './router'
import { createVuestic } from 'vuestic-ui'

//firebase import
import { initializeApp } from 'firebase/app'
import { firebaseConfig, initializeStorage } from './firebase'

const firebase = initializeApp(firebaseConfig)
initializeStorage(firebase)
const app = createApp(App)

app.use(store)
app.use(router)
app.use(createVuestic())

app.mount('#app')
