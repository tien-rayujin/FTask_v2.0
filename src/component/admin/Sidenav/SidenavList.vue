<template>
  <div class="w-full h-full">
    <!-- sidenav-nav -->
    <ul class="mt-5">
      <li v-for="(route, idx) in routes" :key="idx" class="mt-[0.125rem]">
        <SidenavItem
          :path="route.name"
          :nav-text="route.displayName"
          :icon="route.meta.icon"
          :children="route.children"
          :active="isRouteActive(route)"
          active-color="#f6f9fc"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { type INavigationRoutes } from './NavigationRoutes'
  import SidenavItem from './SidenavItem.vue'

  withDefaults(
    defineProps<{
      routes: INavigationRoutes[]
    }>(),
    {
      routes: () => [],
    },
  )

  function isRouteActive(route: INavigationRoutes): boolean {
    return route.name == useRoute().name
  }
</script>
