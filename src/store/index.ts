import { createStore } from 'vuex'
import admin_store from './admin_store'

const store = createStore({
  modules: {
    admin_store: admin_store,
  },
})

export default store
