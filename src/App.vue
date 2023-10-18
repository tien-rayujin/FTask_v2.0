<template>
  <div v-for="item in lecturerList" :key="item.id">
    {{ item }}
  </div>
  <RouterView />
</template>

<script setup lang="ts">
  import store from './store'
  import { type Lecturer } from './store/admin_store'
  store.dispatch('fetchLecturers')

  const lecturerList: Array<Lecturer> = await store.getters.getLecturerList
</script>

<style scoped>
  @import 'scss/main.scss';
</style>
