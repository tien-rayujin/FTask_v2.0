<template>
  <!-- <p>Semester filter {{ semesterFilter }}</p> -->
  <!-- {{ items }} -->
  <ManagementBase>
    <template #header>
      <p class="uppercase text-sm pb-1 text-slate-400 font-semibold">
        Search Task
      </p>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Ex: Gác thi FE SWD392"
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter>
      <div class="w-full grid grid-cols-12 gap-6">
        <div class="col-span-3">
          <p class="uppercase text-sm pb-1 text-slate-400 font-semibold">
            Select Semester
          </p>
          <select
            v-model="semesterFilter"
            class="border rounded-lg py-1.5 px-2 w-full cursor-pointer border-slate-300"
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
      </div>
    </template>

    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
        @click="handleCreateClick"
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
        <template #cell(taskTitle)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(taskContent)="{ value }">
          <span class="text-sm w-[25rem] block overflow-clip">{{ value }}</span>
        </template>

        <template #cell(endDate)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(taskLevel)="{ value }">
          <div
            class="text-sm flex items-center justify-center py-1 px-3 rounded-lg bg-white border"
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

        <template #cell(createdBy)="{ value }">
          <span class="text-sm"
            ><span v-if="value == '422a6948-9868-4a69-e375-08dbc25fd71b'"
              >Admin</span
            >
            <span v-else>teredew@gmail.com</span>
          </span>
        </template>

        <template #cell(taskStatus)="{ value }">
          <span
            class="text-sm border px-3 py-1 w-24 rounded-lg bg-white text-center inline-block"
            :class="{
              'text-slate-400 border-slate-400': value == 0 || value == 'None',
              'text-blue-400 border-blue-400': value == 1 || value == 'Todo',
              'text-yellow-400 border-yellow-400':
                value == 2 || value == 'InProgress',
              'text-green-400 border-green-400': value == 3 || value == 'Done',
            }"
            >{{
              value == 0
                ? 'None'
                : value == 1
                ? 'Todo'
                : value == 2
                ? 'InProgress'
                : 'Done'
            }}
          </span>
        </template>

        <template #cell(actions)="{ rowData }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click.prevent="handeDetailClick(rowData)"
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
  import type { SemesterModel, TaskModel } from './manageModel'
  import taskList from './sampleData/taskList'
  import { ref, onMounted, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const columns = ref([
    { key: 'taskTitle' },
    { key: 'taskContent', label: 'Brief Description' },
    { key: 'endDate', label: 'Due' },
    { key: 'taskLevel', label: 'Level' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'taskStatus', label: '' },
    { key: 'actions', label: '' },
  ])

  onMounted(() => {
    fetchTasks()
    fetchSemester()
  })

  async function fetchTasks() {
    try {
      const response = await axios.get('/api/tasks?page=1&quantity=50')
      const json = response.data
      items.value = (json as Array<TaskModel>).map((item) => {
        item.startDate = new Date(item.startDate).toISOString()
        item.endDate = new Date(item.endDate).toISOString()
        item.createdAt = new Date(item.createdAt).toISOString()
        return item
      })
      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchSemester() {
    try {
      const response = await axios.get('/api/semesters?page=1&quantity=50')
      const json = response.data
      semesterOptions.value = (json as Array<SemesterModel>).map((item) => {
        item.startDate = new Date(item.startDate).toISOString()
        item.endDate = new Date(item.endDate).toISOString()
        item.createdAt = new Date(item.createdAt).toISOString()
        return item
      })
      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()

  const items = ref<Array<TaskModel>>(taskList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)

  const semesterOptions = ref<Array<SemesterModel>>([])

  const semesterFilter = ref('')

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  function handeDetailClick(rowData: TaskModel) {
    router.push({
      name: 'taskDetail',
      params: {
        task_id: rowData.taskId,
      },
    })
  }

  watch(semesterFilter, function () {
    onSemesterSelected()
  })

  async function onSemesterSelected() {
    console.log('Called')
    try {
      const response = await axios.get(
        `/api/tasks?semsesterId=${semesterFilter.value}&page=1&quantity=50`,
      )
      const json = response.data
      items.value = (json as Array<TaskModel>).map((item) => {
        item.startDate = new Date(item.startDate).toISOString()
        item.endDate = new Date(item.endDate).toISOString()
        item.createdAt = new Date(item.createdAt).toISOString()
        return item
      })
      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  function handleCreateClick() {
    router.push({ name: 'taskCreate' })
  }
</script>
