<template>
  {{ items }}
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
        <template #cell(taskStatus)="{ value }">
          <i
            class="text-sm fa-solid fa-circle"
            :class="{
              'text-slate-400': value == 0 || value == 'NONE',
              'text-blue-400': value == 1 || value == 'Todo',
              'text-yellow-400': value == 2 || value == 'InProgress',
              'text-green-400': value == 3 || value == 'Done',
            }"
          ></i>
        </template>

        <template #cell(taskTitle)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(taskContent)="{ value }">
          <span class="text-sm w-[25rem] block overflow-clip">{{ value }}</span>
        </template>

        <template #cell(startDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(endDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(taskLevel)="{ value }">
          <div
            class="text-sm flex items-center justify-center py-1 rounded-lg bg-white border"
            :class="{
              'text-red-500': value == 3 || value == 'subject',
              'text-green-500': value == 1 || value == 'semester',
              'text-gray-500': value == 2 || value == 'department',
            }"
          >
            <div class="w-4/5 mx-auto">
              <i
                class="fa-solid"
                :class="{
                  'fa-book': value == 3 || value == 'subject',
                  'fa-calendar-days': value == 1 || value == 'semester',
                  'fa-building': value == 2 || value == 'department',
                }"
              ></i>
              <span class="ml-3">{{
                value == 1 ? 'Semester' : value == 2 ? 'Department' : 'Subject'
              }}</span>
            </div>
          </div>
        </template>

        <template #cell(location)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <!-- <template #cell(createdBy)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template> -->

        <template #cell(actions)="{}">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click.prevent=""
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
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'

  const columns = ref([
    { key: 'taskStatus', label: '' },
    { key: 'taskTitle' },
    { key: 'taskContent' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'Due' },
    { key: 'taskLevel', label: 'Level' },
    { key: 'location' },
    // { key: 'createdBy', label: 'Created By' },
    { key: 'actions', label: '' },
  ])

  onMounted(() => {
    fetchTasks()
  })

  async function fetchTasks() {
    try {
      const response = await axios.get('/api/tasks?page=1&quantity=10')
      const json = response.data
      items.value = (json as Array<TaskModel>).map((item) => {
        item.startDate = item.startDate.toLocaleString().slice(0, 10)
        item.endDate = item.endDate.toLocaleString().slice(0, 10)
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
        return item
      })
      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const items = ref<TaskModel[]>(taskList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  const statusFilter = ref()
  const statusOptions = ref(['Todo', 'In Progress', 'Done'])

  const departmentListMap = departmentList.map((x) => x.departmentName)
  const departmentFilter = ref()
  const departmentOptions = ref<Array<string>>(departmentListMap)

  const typeFilter = ref()
  const typeOptions = ref(['Semester', 'Department', 'Subject'])

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })
</script>
