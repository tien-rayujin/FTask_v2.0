import type { IdTokenResult } from 'firebase/auth'
import { defineStore } from 'pinia'
import type { RoleModel } from '@/views/admin/management/manageModel'

export interface UserObj {
  email: string | undefined
  idToken: string | undefined
  refreshToken: string | undefined
  phoneNumber: string | undefined
  displayName: string | undefined
  photoURL: string | undefined
  role: string | undefined
}
export interface UserInfo {
  CreatedBy: string | undefined
  CreatedAt: string | undefined
  Id: string | undefined
  Email: string | undefined
  NormalizedEmail: string | undefined
  EmailConfirmed: boolean | undefined
  PhoneNumber: string | undefined
  PhoneNumberConfirmed: boolean | undefined
  TwoFactorEnabled: boolean | undefined
  LockoutEnd: string | undefined
  LockoutEnabled: boolean | undefined
  FilePath: string | undefined
  DisplayName: string | undefined
  Roles: RoleModel[] | undefined
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as unknown as UserObj,
    idToken: undefined as unknown as IdTokenResult,
    userInfo: undefined as unknown as UserInfo,
  }),
  actions: {
    setUser(user: UserObj) {
      user.role = 'admin' // set fixed as admin
      this.user = user
    },
    setData(user: UserObj, idToken: IdTokenResult, userInfo: UserInfo) {
      user.role = 'admin' // set fixed as admin
      this.user = user
      this.idToken = idToken
      this.userInfo = userInfo
    },
  },
  getters: {
    isAdmin(state): boolean {
      return state.user?.role === 'admin'
    },
    isAuthenticated(state): boolean {
      return state.user != undefined
    },
  },
})
