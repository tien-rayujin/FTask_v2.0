<template>
  <div class="min-h-[18.75rem] absolute w-full bg-[#2dce89] -z-50" />
  <aside
    class="sidenav max-w-[15.625rem] block fixed top-0 bottom-0 left-0 translate-x-0 my-4 ml-4 bg-white rounded-tl-3xl overflow-y-auto"
  >
    <div class="sidenav-header">
      <RouterLink class="sidenav-brand" to="/">
        <i class="fa-solid fa-layer-group"></i>
        <span class="mx-2 font-semibold">FPT Task Management</span>
      </RouterLink>

      <div class="horizontalSpacer" />

      <SidenavList :routes="routes" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SidenavList from './SidenavList.vue'
  import NavigationRoutes, { type INavigationRoutes } from './NavigationRoutes'

  const routes = ref<INavigationRoutes[]>(NavigationRoutes.routes)
</script>

<style scoped lang="scss">
  .sidenav-header {
    @apply h-[4.875rem];
  }

  .sidenav-brand {
    @apply block text-[#344767] text-[0.875rem];
  }

  .sidenav .sidenav-brand {
    @apply py-6 px-8;
  }

  .horizontalSpacer {
    @apply bg-gradient-to-r from-transparent via-black/10 to-transparent bg-transparent px-4 h-[0.05rem];
  }
</style>
