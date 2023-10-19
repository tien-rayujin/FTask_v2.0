<template>
  <nav aria-label="breadcrumb">
    <ol class="pt-1 mr-16 text-sm text-white flex">
      <li class="opacity-80"><a href="#">Pages</a> /</li>
      <li class="pl-2 font-medium">
        {{ pageName }}
      </li>
    </ol>
    <h6 class="text-white font-extrabold">{{ pageName }}</h6>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    currentPage: {
      type: String,
      required: true,
    },
    textWhite: {
      type: String,
      required: false,
      default: 'Home',
    },
  })

  const pageName = ref(
    props.currentPage
      .replace(/^./, props.currentPage[0].toUpperCase())
      .toString(),
  )
</script>
