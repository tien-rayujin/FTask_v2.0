<template>
  <!-- <span
    class="inline-block text-white items-center rounded-md text-[.625rem] py-[0.45em] px-[0.775em] uppercase bg-gradient-to-tr"
    :class="{
      'from-emerald-500 to-cyan-500': status,
      'from-gray-700 to-gray-500': !status,
    }"
    >{{ text }}</span
  > -->
  <span
    class="text-sm px-3 py-1 w-28 font-semibold rounded-lg text-center inline-block"
    ><i
      class="fa-solid fa-circle me-2"
      :class="{
        'text-slate-400': !status,
        'text-green-400': status,
      }"
    ></i>
    {{ status == true ? 'Active' : 'Inactive' }}
  </span>
</template>

<script setup lang="ts">
  defineProps({
    status: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  })
</script>
