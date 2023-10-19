<template>
  <RouterLink
    :to="{ name: path }"
    class="text-[#344767] py-[.75rem] px-[1rem] mx-2 flex items-center rounded-xl"
    :class="{ 'bg-[#f6f9fc]': active }"
  >
    <div class="p-[.625rem]">
      <span :class="icon" />
    </div>
    <span class="">{{ navText }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
  import { type INavigationRoutes } from './NavigationRoutes'
  defineProps({
    path: {
      type: String,
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    children: {
      type: Array as () => INavigationRoutes[],
      required: false,
      default: null,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    activeColor: {
      type: String,
      required: true,
      default: '#f6f9fc',
    },
  })
</script>
