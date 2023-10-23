<template>
  <div class="flex p-4 flex-col">
    <div class="text-left mb-3">
      <!-- car header -->
      <h1 class="font-black text-2xl text-[#344767]">Sign up</h1>
      <p class="mt-2 text-[#79849b]">Create your brand new account here</p>
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
        <div class="w-full relative">
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Password"
            class="w-full text-sm p-3 pr-[2.75rem] rounded-lg border border-[#d2d6da]"
          />
          <div
            class="w-[2.75rem] h-[2.75rem] flex items-center justify-center absolute right-0 top-0 cursor-pointer text-[#344767]"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <i v-if="isPasswordVisible" class="fa-solid fa-eye"></i>
            <i v-else class="fa-solid fa-eye-slash"></i>
          </div>
        </div>
      </div>
      <div class="mb-2 flex items-center justify-center">
        <div class="w-full relative">
          <input
            :type="isPasswordConfirmVisible ? 'text' : 'password'"
            placeholder="Confirm Password"
            class="w-full text-sm p-3 pr-[2.75rem] rounded-lg border border-[#d2d6da]"
          />
          <div
            class="w-[2.75rem] h-[2.75rem] flex items-center justify-center absolute right-0 top-0 cursor-pointer text-[#344767]"
            @click="isPasswordConfirmVisible = !isPasswordConfirmVisible"
          >
            <i v-if="isPasswordConfirmVisible" class="fa-solid fa-eye"></i>
            <i v-else class="fa-solid fa-eye-slash"></i>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <button
          class="border border-slate-300 flex items-center justify-center text-sm text-white font-black bg-[#2dce89] py-3 px-4 rounded-xl transition-all hover:scale-110 duration-300 w-full"
        >
          Sign up
        </button>
      </div>
    </div>
    <div class="mt-3 text-sm text-center text-[#79849b]">
      <p>
        Already have an account?
        <RouterLink
          :to="{ name: 'signin' }"
          class="text-[#2dce89] font-semibold"
          >Sign in</RouterLink
        >
      </p>
      <div class="flex items-center justify-around">
        <SigninGoogleButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SigninGoogleButton from '@/components/admin/SigninGoogleButton.vue'
  import { ref } from 'vue'
  const isPasswordVisible = ref(false)
  const isPasswordConfirmVisible = ref(false)
</script>
