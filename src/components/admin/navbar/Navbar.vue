<template>
  <div class="py-2 mx-6">
    <div class="px-4 py-1 flex items-center">
      <!-- Breadcumbs -->
      <Breadcumbs />
      <div class="mt-2 ml-auto mr-3">
        <select
          v-model="semesterFilter"
          class="border rounded-lg py-1.5 px-2 w-fit cursor-pointer border-slate-300"
          :class="{
            hidden: route.name != 'dashboard',
          }"
        >
          <option disabled value="">Semester</option>
          <option
            v-for="semester in semesterOptions"
            :key="semester.semesterId"
            :value="semester.semesterId"
          >
            {{ semester.semesterCode }}
          </option>
        </select>
      </div>

      <!-- Searchbar -->
      <div class="mt-2 flex items-center pr-4 relative rounded-md shadow-sm">
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
          <a href="#">
            <i class="fa fa-bell"></i>
          </a>
        </li>
        <li
          class="drop-item relative"
          @click="onMenuExpanded = !onMenuExpanded"
        >
          <a href="#">
            <i class="fa fa-bars"></i>
          </a>

          <ul
            class="absolute right-0 mt-5 bg-white rounded-br-xl rounded-bl-xl rounded-tl-xl text-black shadow-lg overflow-hidden transition-all cursor-pointer opacity-90"
            :class="{ hidden: onMenuExpanded }"
          >
            <li class="itemDropdown">
              <i class="fa-solid fa-user-gear mr-2"></i>
              <span>Profile</span>
            </li>
            <li class="itemDropdown" @click="handleSignOut">
              <i class="fa-solid fa-right-from-bracket mr-2"></i>
              <span>Logout</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Breadcumbs from './Breadcumbs.vue'
  import { useUserStore } from '@/stores/user-store'
  import type { SemesterModel } from '@/views/admin/management/manageModel'
  import axios from 'axios'
  import { ref, onMounted, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import {
    getAuth,
    onAuthStateChanged,
    signOut,
    type Auth,
  } from 'firebase/auth'

  const userStore = useUserStore()

  const user = ref({ name: '', img: '' })
  const semesterFilter = ref('')
  const semesterOptions = ref<Array<SemesterModel>>([])
  const onMenuExpanded = ref(!false)
  let auth: Auth = getAuth()
  const router = useRouter()
  const route = useRoute()

  onMounted(() => {
    user.value = {
      name: userStore.user?.displayName as string,
      img: userStore.user?.photoURL as string,
    }
    fetchSemester()

    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      console.log(user)
    })
  })

  watch(semesterFilter, () => {
    console.log('Update dashboard based on semester filter selected!')
  })

  async function fetchSemester() {
    try {
      const response = await axios.get('/api/semesters?page=1&quantity=50')
      const json = response.data
      semesterOptions.value = (json as Array<SemesterModel>).map((item) => {
        item.startDate = item.startDate.toLocaleString().slice(0, 10)
        item.endDate = item.endDate.toLocaleString().slice(0, 10)
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
        return item
      })

      semesterFilter.value =
        semesterOptions.value.at(semesterOptions.value.length - 1)?.semesterId +
        ''

      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  function handleSignOut() {
    signOut(auth).then(() => {
      console.log('User SignOut')
      router.push({ name: 'signin' })
    })
  }
</script>

<style scoped lang="scss">
  .drop-item {
    @apply px-2;
  }

  .itemDropdown {
    @apply border-b border-slate-300 w-full px-10 py-3 flex items-center justify-center hover:bg-slate-100 duration-200;
  }
</style>
