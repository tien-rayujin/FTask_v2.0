import { defineStore } from 'pinia'

export const useStatisticStore = defineStore('statistic', {
  state: () => ({
    semesterId: '',
    from: new Date().toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
  }),
  actions: {
    setState(from: string, to: string, semesterId: string) {
      this.from = from
      this.to = to
      this.semesterId = semesterId
    },
  },
  getters: {
    getState(state) {
      return state
    },
  },
})
