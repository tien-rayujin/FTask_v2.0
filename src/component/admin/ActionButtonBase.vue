<template>
  <div
    class="mx-1 px-2 py-2 border border-slate-300 rounded-xl w-[36px] h-[36px] flex items-center justify-center hover:bg-slate-200 cursor-pointer"
    :class="color"
  >
    <i :class="icon"></i>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '#8392ab',
    },
  })
</script>
