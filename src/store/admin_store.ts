import { createStore } from 'vuex'

export interface Lecturer {
  id: string
  email: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
}

const admin_store = createStore({
  state: {
    lecturerList: Array<Lecturer>(),
  },
  mutations: {
    setLecturerList(
      state: { lecturerList: Array<Lecturer> },
      payload: Array<Lecturer>,
    ) {
      state.lecturerList = payload
    },
  },
  actions: {
    setLecturerList({ commit }, payload: Array<Lecturer>) {
      commit('setLecturerList', payload)
    },
    async fetchLecturers({ commit }) {
      const response = await fetch('/api/Lecturer?page=1&quantity=15')
      const json = await response.json()
      commit('setLecturerList', json)
    },
  },
  getters: {
    getLecturerList(state) {
      return state.lecturerList
    },
  },
})

// context: {commit, state}

export default admin_store
