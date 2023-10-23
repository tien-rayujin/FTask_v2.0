<template>
  <ManagementBase>
    <template #header>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search Task..."
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter>
      <div class="w-full grid grid-cols-12 gap-6">
        <va-select
          v-model="statusFilter"
          :options="statusOptions"
          placeholder="Status"
          preset="bordered"
          class="w-37 col-span-3"
        />

        <va-select
          v-model="departmentFilter"
          :options="departmentOptions"
          placeholder="Department"
          preset="bordered"
          class="w-37 col-span-3"
          value-by="name"
        />

        <va-select
          v-model="typeFilter"
          :options="typeOptions"
          placeholder="Type"
          preset="bordered"
          class="w-37 col-span-3"
        />
      </div>
    </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add Task</span>
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
        <template #cell(status)="{ value }">
          <i
            class="text-sm fa-solid fa-circle"
            :class="{
              'text-blue-400': value == 'Todo',
              'text-yellow-400': value == 'InProgress',
              'text-green-400': value == 'Done',
            }"
          ></i>
        </template>

        <template #cell(title)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(description)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(due_date)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(type)="{ value }">
          <div
            class="text-sm flex items-center justify-center py-1 rounded-lg bg-white border"
            :class="{
              'text-red-500': value == 'subject',
              'text-green-500': value == 'semester',
              'text-gray-500': value == 'department',
            }"
          >
            <div class="w-4/5 mx-auto">
              <i
                class="fa-solid"
                :class="{
                  'fa-book': value == 'subject',
                  'fa-calendar-days': value == 'semester',
                  'fa-building': value == 'department',
                }"
              ></i>
              <span class="ml-3">{{ value }}</span>
            </div>
          </div>
        </template>

        <template #cell(created_at)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(created_by)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(actions)="{ rowIndex }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click.prevent="openModalToEditItemById(rowIndex)"
              />
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
  import type { TaskModel } from './manageModel'
  import taskList from './sampleData/taskList'
  import departmentList from './sampleData/departmentList'
  import { ref, computed } from 'vue'

  const columns = ref([
    { key: 'status', label: '' },
    { key: 'title' },
    { key: 'description' },
    { key: 'due_date', label: 'Due' },
    // { key: 'priority' },
    { key: 'type', label: '' },
    { key: 'created_at', label: 'Created At' },
    { key: 'created_by', label: 'Created By' },
    { key: 'actions', label: '' },
  ])

  const items = ref<TaskModel[]>(taskList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  const users = ref(taskList)
  const showModal = ref(false)
  const editedItemName = ref(null)
  const editedItem = ref<TaskModel>()

  const statusFilter = ref()
  const statusOptions = ref(['Todo', 'In Progress', 'Done'])

  const departmentListMap = departmentList.map((x) => x.name)
  const departmentFilter = ref()
  const departmentOptions = ref<Array<string>>(departmentListMap)

  const typeFilter = ref()
  const typeOptions = ref(['Semester', 'Department', 'Subject'])

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  function openModalToEditItemById(name: any) {
    editedItemName.value = name
    editedItem.value = { ...users.value[name] }
    //show model.value based on id
    showModal.value = !showModal.value
  }
</script>
