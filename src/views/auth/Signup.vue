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
      <div class="mb-2 flex items-center justify-center">
        <input
          :type="isPasswordConfirmVisible ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="block w-full text-sm p-3 rounded-tl-lg rounded-bl-lg border border-[#d2d6da]"
        />
        <div
          class="w-[2.83rem] h-[2.83rem] border border-[#d2d6da] rounded-tr-lg rounded-br-lg flex items-center justify-center bg-white hover:bg-slate-200 cursor-pointer"
          @click="isPasswordConfirmVisible = !isPasswordConfirmVisible"
        >
          <i v-if="isPasswordConfirmVisible" class="fa-solid fa-eye"></i>
          <i v-else class="fa-solid fa-eye-slash"></i>
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const isPasswordVisible = ref(false)
  const isPasswordConfirmVisible = ref(false)
</script>
