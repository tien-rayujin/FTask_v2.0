<template>
  <button class="btn bg-blue-400 px-5 py-3 rounded-xl text-white">
    Hello, Click me!
  </button>
  <div>
    <h1>Test Icon</h1>
    <h3>Entypo</h3>

    <span class="entypo-home"> </span>
    <span class="entypo-air"> </span>
    <span class="entypo-user-add"> </span>

    <h1>data from fetching API</h1>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const data = ref([])

  onMounted(() => {
    fetchLecturers()
  })
  async function fetchLecturers() {
    const response = await fetch('/api/lecturers')
    const json = await response.json()
    data.value = json
    console.log(json)
  }
</script>

<style scoped></style>
