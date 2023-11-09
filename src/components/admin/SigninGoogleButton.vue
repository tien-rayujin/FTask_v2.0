<template>
  <button
    class="w-full bg-white border border-slate-300 rounded-lg py-3 mt-5 flex items-center justify-center"
    @click="signInWithGoogle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      class="w-5 h-5"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
    <span class="ml-5 font-semibold">Sign in with Google</span>
  </button>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user-store'
  import { type UserObj, type UserInfo } from '@/stores/user-store'
  import axios from 'axios'
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    type User,
    type UserCredential,
  } from 'firebase/auth'

  const router = useRouter()
  const userStore = useUserStore()

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(async (result: UserCredential) => {
        const user: User = result.user
        const idToken = await user.getIdTokenResult()
        console.log('Id token from user: ')
        console.log(idToken.token)
        console.log('SignIn with google account')
        console.log('userAccount:')
        console.log(user)

        const response = await axios.post(
          'https://ftask-api.azurewebsites.net/api/auth/login-google-user?idToken=' +
            idToken.token,
        )
        const json = response.data
        const userInfo: UserInfo = json['UserInformation']
        console.log(json)

        const UserLogin: UserObj = {
          email: user.email as string,
          idToken: idToken.token as string, // user
          refreshToken: user.refreshToken as string,
          phoneNumber: user.phoneNumber as string,
          displayName: user.displayName as string,
          photoURL: user.photoURL as string,
          role: 'admin' as string,
        }
        const UserInfo: UserInfo = {
          CreatedBy: userInfo.CreatedBy as string,
          CreatedAt: userInfo.CreatedAt as string,
          Id: userInfo.Id as string,
          Email: userInfo.Email as string,
          NormalizedEmail: userInfo.NormalizedEmail as string,
          EmailConfirmed: userInfo.EmailConfirmed as boolean,
          PhoneNumber: userInfo.PhoneNumber as string,
          PhoneNumberConfirmed: userInfo.PhoneNumberConfirmed as boolean,
          TwoFactorEnabled: userInfo.TwoFactorEnabled as boolean,
          LockoutEnd: userInfo.LockoutEnd as string,
          LockoutEnabled: userInfo.LockoutEnabled as boolean,
          FilePath: userInfo.FilePath as string,
          DisplayName: userInfo.DisplayName as string,
          Roles: [
            {
              id: '82d85e76-2c04-460f-5785-08dbc25fd2ea',
              name: 'Admin',
              createdBy: 'Undefined',
              createdAt: '0001-01-01T00:00:00',
            },
          ],
        }
        console.log('UserInfo: ')
        console.log(UserInfo)
        console.log('UserLogin: ')
        console.log(UserLogin)

        // store UserLogin to pinia
        userStore.setData(UserLogin, idToken, UserInfo)

        router.push({ name: 'dashboard' })
      })
      .catch((reason) => {
        console.log('ERR: ')
        console.log(reason.code)
        alert(reason.message)
      })
  }
</script>
