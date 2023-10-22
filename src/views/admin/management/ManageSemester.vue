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
      <va-modal v-model="showModal" close-button class="">
        <div class="va-h3 text-3xl text-center">
          Detail of {{ editedItem?.name }}
        </div>
        <div>
          <ul class="list-disc">
            <li><b>Semester ID: </b>{{ editedItem?.Id }}</li>
            <li><b>Semester Name: </b>{{ editedItem?.name }}</li>
            <li><b>Semester Code: </b>{{ editedItem?.code }}</li>
            <li><b>Semester Start Date: </b>{{ editedItem?.startDate }}</li>
            <li><b>Semester End Date: </b>{{ editedItem?.endDate }}</li>
          </ul>
        </div>
      </va-modal>

      <va-data-table
        :items="items"
        :columns="columns"
        :filter="searchValue"
        :per-page="perPage"
        :current-page="currentPage"
        :style="{ '--va-data-table-thead-color': '#8392ab' }"
      >
        <template #cell(id)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(code)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(startDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(endDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(status)="{ value }">
          <BadgeBase :status="value == 'online'" :text="value" />
        </template>

        <template #cell(actions)="{ rowIndex }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click.prevent="openModalToEditItemById(rowIndex)"
              />
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
  import ManagementBase from '@/component/admin/ManagementBase.vue'
  import BadgeBase from '@/component/admin/BadgeBase.vue'
  import ActionButtonBase from '@/component/admin/ActionButtonBase.vue'
  import type { SemesterModel } from './manageModel'
  import semesterList from './sampleData/semesterList'
  import { ref, computed } from 'vue'

  const columns = ref([
    { key: 'id' },
    { key: 'code' },
    { key: 'startDate' },
    { key: 'endDate' },
    { key: 'actions', label: '' },
  ])

  const items = ref<SemesterModel[]>(semesterList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  const semesters = ref(semesterList)
  const showModal = ref(false)
  const editedItemId = ref(null)
  const editedItem = ref<SemesterModel>()

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  function openModalToEditItemById(id: any) {
    editedItemId.value = id
    editedItem.value = { ...semesters.value[id] }
    //show model.value based on id
    showModal.value = !showModal.value
  }
</script>
