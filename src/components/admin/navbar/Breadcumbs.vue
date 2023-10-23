<template>
  <nav aria-label="breadcrumb">
    <ol class="pt-1 mr-16 text-sm text-white flex">
      <li class="opacity-80"><a href="#">Pages</a> /</li>
      <li class="pl-2 font-medium capitalize">
        {{ route.name }}
      </li>
    </ol>
    <h6 class="text-white font-extrabold capitalize">{{ route.name }}</h6>
  </nav>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()
  defineProps({
    textWhite: {
      type: String,
      required: false,
      default: 'Home',
    },
  })
</script>
