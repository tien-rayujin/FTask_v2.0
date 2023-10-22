<template>
  <div
    class="w-full h-screen p-0 relative overflow-hidden flex items-center justify-between"
  >
    <!-- <Signin /> -->
    <div class="h-full w-1/2 flex items-center justify-center">
      <RouterView />
    </div>
    <div class="h-full w-1/2 flex items-center justify-center">
      <div
        class="w-[95%] h-[95%] bg-cover rounded-3xl overflow-hidden flex flex-col items-center justify-center relative"
        style="
          background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
        "
      >
        <!-- bg gradient -->
        <span
          class="absolute w-full h-full opacity-60"
          style="
            background-image: linear-gradient(310deg, #2dce89 0%, #2dcecc 100%);
          "
        ></span>
        <h4 class="mt-5 text-white text-xl font-black relative">
          "Attention is the new currency"
        </h4>
        <p class="text-white relative mt-3 w-3/4 text-center">
          The more effortless the writing looks, the more effort the writer
          actually put into the process.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import Signin from '@/views/auth/Signin.vue'
</script>

<style scoped></style>
