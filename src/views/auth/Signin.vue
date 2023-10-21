<template>
  <div class="flex p-4 flex-col">
    <div class="text-left mb-3">
      <!-- car header -->
      <h2 class="font-black text-2xl text-[#344767]">Sign in</h2>
      <p class="mt-2 text-[#79849b]">
        Enter your email and password to sign in
      </p>
    </div>
    <div>
      <!-- car body -->
      <div class="mb-2">
        <input
          type="text"
          placeholder="Email"
          class="block w-full text-sm p-3 rounded-lg border border-[#d2d6da]"
        />
      </div>
      <div class="mb-2 flex items-center justify-center">
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Password"
          class="block w-full text-sm p-3 rounded-tl-lg rounded-bl-lg border border-[#d2d6da]"
        />
        <div
          class="w-[2.83rem] h-[2.83rem] border border-[#d2d6da] rounded-tr-lg rounded-br-lg flex items-center justify-center bg-white hover:bg-slate-200 cursor-pointer"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          <i v-if="isPasswordVisible" class="fa-solid fa-eye"></i>
          <i v-else class="fa-solid fa-eye-slash"></i>
        </div>
      </div>
      <div class="flex items-center justify-start">
        <va-switch v-model="remember" size="small" color="#6679e5" />
        <p class="ml-3 text-sm text-[#79849b]">Remember me</p>
      </div>
      <div class="mt-4">
        <button
          @click="signInWithGoogle"
          class="border border-slate-300 flex items-center justify-center text-sm text-white font-black bg-[#2dce89] py-3 px-4 rounded-xl transition-all hover:scale-110 duration-300 w-full"
        >
          Sign in
        </button>
      </div>
    </div>
    <div class="mt-3 text-sm text-center text-[#79849b]">
      <p>
        Don't have an account?
        <RouterLink
          :to="{ name: 'signup' }"
          class="text-[#2dce89] font-semibold"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    type UserCredential,
  } from 'firebase/auth'

  const remember = ref(false)
  const isPasswordVisible = ref(false)
  const router = useRouter()

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      console.log(result)

      const user = result.user
      console.log(user)

      router.push({ name: 'dashboard' })
    })
  }
</script>
