<template>
  <span
    class="inline-block text-white items-center rounded-md text-[.625rem] py-[0.45em] px-[0.775em] uppercase bg-gradient-to-tr from-emerald-500 to-cyan-500"
    :class="{
      'from-emerald-500 to-cyan-500': status,
      'from-gray-700 to-gray-500': !status,
    }"
    >{{ text }}</span
  >
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
