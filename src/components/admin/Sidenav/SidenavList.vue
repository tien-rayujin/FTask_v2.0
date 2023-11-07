<template>
  <div class="w-full h-full">
    <!-- sidenav-nav -->
    <ul class="mt-5">
      <li v-for="(route, idx) in routes" :key="idx" class="mt-[0.125rem]">
        <div
          v-if="route.meta.scope"
          class="text-slate-400 mx-5 mt-2 text-xs border-b border-slate-200 uppercase"
        >
          {{ route.meta.scope }}
        </div>
        <SidenavItem
          :path="route.name"
          :nav-text="route.displayName"
          :icon="route.meta.icon"
          :children="route.children"
          :active="isRouteActive(route)"
          :color="route.meta.color"
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
