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

    <button
      class="text-[#344767] py-[.75rem] px-[1rem] mx-2 flex items-center rounded-xl hover:bg-slate-200 font-semibold transition-all ease-in-out duration-400 border border-slate-300 absolute right-0 bottom-2 left-0"
      @click="handleSignOut"
    >
      <div class="p-[.625rem]">
        <i class="fa-solid fa-right-from-bracket"></i>
      </div>
      <span>SignOut</span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { type INavigationRoutes } from './NavigationRoutes'
  import SidenavItem from './SidenavItem.vue'
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  import {
    getAuth,
    onAuthStateChanged,
    signOut,
    type Auth,
  } from 'firebase/auth'

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

  let auth: Auth = getAuth()
  const router = useRouter()

  onMounted(() => {
    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      console.log(user)
    })
  })

  function handleSignOut() {
    signOut(auth).then(() => {
      console.log('User SignOut')
      router.push({ name: 'signin' })
    })
  }
</script>
