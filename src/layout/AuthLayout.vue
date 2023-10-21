<template>
  <div
    class="w-full min-h-screen p-0 relative overflow-hidden flex items-center justify-center"
  >
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
        <div class="mb-2">
          <input
            type="text"
            placeholder="Password"
            class="block w-full text-sm p-3 rounded-lg border border-[#d2d6da]"
          />
        </div>
        <div class="flex items-center justify-start">
          <va-switch v-model="remember" size="small" color="#6679e5" />
          <p class="ml-3 text-sm text-[#79849b]">Remember me</p>
        </div>
        <div class="mt-4">
          <button
            class="border border-slate-300 flex items-center justify-center text-sm text-white font-black bg-[#2dce89] py-3 px-4 rounded-xl transition-all hover:scale-110 duration-300 w-full"
          >
            Sign in
          </button>
        </div>
      </div>
      <div class="mt-3 text-sm text-center text-[#79849b]">
        <p>
          Don't have an account?
          <a href="#" class="text-[#2dce89] font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const remember = ref(false)
</script>

<style scoped></style>
