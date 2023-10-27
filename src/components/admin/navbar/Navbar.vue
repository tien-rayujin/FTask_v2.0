<template>
  <div class="py-2 mx-6">
    <div class="px-4 py-1 flex items-center">
      <!-- Breadcumbs -->
      <Breadcumbs />

      <!-- Searchbar -->
      <div
        class="mt-2 flex items-center ml-auto pr-4 relative rounded-md shadow-sm"
      >
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <span
            class="text-gray-500 sm:text-sm fa-solid fa-magnifying-glass"
          ></span>
        </div>
        <input
          type="text"
          name="price"
          class="block w-[210px] rounded-md border-0 py-2 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Type here..."
        />
      </div>

      <!-- User utils -->
      <ul class="mt-2 flex items-center justify-end text-white">
        <li class="">
          <img
            class="inline-block w-8 h-8 object-cover rounded-full border border-slate-100 border-opacity-20"
            :src="user.img"
            alt="user avatar"
          />
          <span class="inline-block px-3">{{ user.name }}</span>
        </li>
        <li class="drop-item">
          <a href="#" class="relative" @click.prevent="toggleSettingDropdown()">
            <i class="fa fa-cog"></i>
            <ul v-if="settingShow" class="absolute top-6 -right-1 mt-3">
              <i
                class="fa-solid fa-caret-up block text-end absolute -top-2 right-1"
              ></i>
              <li
                class="bg-white text-slate-600 w-[11.375rem] h-[2.5rem] flex items-center justify-center font-semibold hover:bg-[#f6f9fc]"
              >
                Logout
              </li>
            </ul>
          </a>
        </li>
        <li class="drop-item">
          <a href="#">
            <i class="fa fa-bell"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Breadcumbs from './Breadcumbs.vue'
  import { useUserStore } from '@/stores/user-store'
  import { ref, onMounted } from 'vue'

  const settingShow = ref(false)
  const userStore = useUserStore()

  const user = ref({ name: '', img: '' })

  onMounted(() => {
    user.value = {
      name: userStore.user?.displayName as string,
      img: userStore.user?.photoURL as string,
    }
  })

  function toggleSettingDropdown() {
    settingShow.value = !settingShow.value
  }
</script>

<style scoped lang="scss">
  .drop-item {
    @apply px-2;
  }
</style>
