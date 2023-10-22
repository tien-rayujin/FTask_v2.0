import { defineStore } from 'pinia'

export interface UserObj {
  email: string | undefined
  accessToken: string | undefined
  refreshToken: string | undefined
  phonenNumber: string | undefined
  displayName: string | undefined
  photoURL: string | undefined
  role: string | undefined
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as unknown as UserObj,
  }),
  actions: {
    setUser(user: UserObj) {
      user.role = 'admin' // set fixed as admin
      this.user = user
    },
  },
  getters: {
    isAdmin(state): boolean {
      return state.user?.role === 'admin'
    },
  },
})
