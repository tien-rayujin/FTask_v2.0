<template>
  <ManagementBase>
    <template #header>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search Semester..."
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter> </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add Semester</span>
      </button>
    </template>
    <template #main>
      <va-data-table
        :items="items"
        :columns="columns"
        :filter="searchValue"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        :style="{ '--va-data-table-thead-color': '#8392ab' }"
      >
        <template #cell(semesterCode)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(startDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(endDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(createdBy)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(createdAt)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <!-- <template #cell(status)="{ value }">
          <BadgeBase :status="value == 'online'" :text="value" />
        </template> -->

        <template #cell(actions)="">
          <div class="w-[60px]">
            <div class="flex items-center justify-center">
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
              />
              <ActionButtonBase icon="fa-solid fa-ban" color="text-red-400" />
            </div>
          </div>
        </template>
      </va-data-table>
    </template>
    <template #footer>
      <div class="flex justify-center my-4">
        <va-pagination
          v-model="currentPage"
          :pages="pages"
          :visible-pages="visualPage"
          gapped
          rounded
          color="#2dce89"
        >
        </va-pagination>
      </div>
    </template>
  </ManagementBase>
</template>

<script setup lang="ts">
  import ManagementBase from '@/components/admin/ManagementBase.vue'
  import ActionButtonBase from '@/components/admin/ActionButtonBase.vue'
  import type { SemesterModel } from './manageModel'
  import { ref, computed, onMounted } from 'vue'

  const columns = ref([
    { key: 'semesterCode', label: 'Semester Code' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'Due Date' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created Date' },
    { key: 'actions', label: '' },
  ])

  const items = ref<SemesterModel[]>([])
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  onMounted(() => {
    fetchSemesters()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  async function fetchSemesters() {
    const response = await fetch('/api/semesters?page=1&quantity=10')
    const json = await response.json()
    items.value = json
    console.log(json)
  }
</script>
