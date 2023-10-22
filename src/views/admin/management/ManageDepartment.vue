<template>
  <ManagementBase>
    <template #header>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search Department..."
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter> </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add Department</span>
      </button>
    </template>
    <template #main>
      <va-modal v-model="showModal" ok-text="Apply" close-button>
        <h3 class="va-h3 text-center">Detail of {{ editedItem?.name }}</h3>
        <ul class="list-disc">
          <li><b>Department ID: </b>{{ editedItem?.Id }}</li>
          <li><b>Department Name: </b>{{ editedItem?.name }}</li>
          <li><b>Department Code: </b>{{ editedItem?.code }}</li>
          <li><b>Head Lecturer ID: </b>{{ editedItem?.lecturerHead_Id }}</li>
          <li>
            <b>Head Lecturer Name: </b>{{ editedItem?.lecturerHead_name }}
          </li>
        </ul>
      </va-modal>

      <va-data-table
        :items="items"
        :columns="columns"
        :filter="searchValue"
        :per-page="perPage"
        :current-page="currentPage"
        :style="{ '--va-data-table-thead-color': '#8392ab' }"
      >
        <template #cell(name)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(code)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(lecturerHead_name)="{ value }">
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
  import type { DepartmentModel } from './manageModel'
  import departmentList from './sampleData/departmentList'
  import { ref, computed } from 'vue'

  const columns = ref([
    { key: 'name' },
    { key: 'code' },
    { key: 'lecturerHead_name' },
    { key: 'actions', label: '' },
  ])

  const items = ref<DepartmentModel[]>(departmentList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  const departments = ref(departmentList)
  const showModal = ref(false)
  const editedItemId = ref(null)
  const editedItem = ref<DepartmentModel>()

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  function openModalToEditItemById(id: any) {
    editedItemId.value = id
    editedItem.value = { ...departments.value[id] }
    //show model.value based on id
    showModal.value = !showModal.value
  }
</script>
