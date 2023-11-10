<template>
  <!-- <p>Item {{ item }}</p> -->
  <!-- <p>Item TaskLecturers {{ item?.taskLecturers }}</p> -->
  <!-- <p>
    Item Activities
    {{ item?.taskLecturers }}
  </p>
  <p>Id {{ route.params?.task_id }}</p>
  <p>Full Path {{ route.fullPath }}</p>
  <p>Task Lecturer {{ item.taskLecturers }}</p>
  <p>Item Lecturer {{ itemLecturer }}</p>
  <p>Item Activities {{ itemActivities }}</p> -->
  <!-- <p>Create item {{ createItem }}</p>
  <p>Selected item {{ selectedItem }}</p> -->
  <va-modal
    v-model="showCreateModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Lecturer Create</h2>
      </div>
    </template>
    <template #default>
      <div
        class="w-[600px] h-fit relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Title</span>
            <input
              v-model="createItem.ActivityTitle"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Description</span>
            <input
              v-model="createItem.activityDescription"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3">Deadline</span>
            <input
              v-model="createItem.deadline"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3"
              >Assignee / Lecturer</span
            >
            <va-select
              v-model="createItem.taskLecturerId"
              :options="itemLecturer"
              class="w-full"
              text-by="lecturer.email"
              value-by="taskLecturerId"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <va-button
        color="#fcfcfc"
        text-color="#797f8a"
        @click="showCreateModal = false"
      >
        Cancel
      </va-button>
      <va-button
        class="ml-5"
        text-color="#fff"
        color="#2dce89"
        @click="handleCreateClick()"
      >
        Create
      </va-button>
    </template>
  </va-modal>

  <va-modal v-model="showEditModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Lecturer Create</h2>
      </div>
    </template>
    <template #default>
      <div
        class="w-[600px] h-fit relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Title</span>
            <input
              v-model="edittedItem.ActivityTitle"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Description</span>
            <input
              v-model="edittedItem.activityDescription"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3">Deadline</span>
            <input
              v-model="edittedItem.deadline"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3"
              >Assignee / Lecturer</span
            >
            <va-select
              v-model="edittedItem.taskLecturerId"
              :options="itemLecturer"
              class="w-full"
              text-by="lecturer.email"
              value-by="taskLecturerId"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <va-button
        color="#fcfcfc"
        text-color="#797f8a"
        @click="showEditModal = false"
      >
        Cancel
      </va-button>
      <va-button
        class="ml-5"
        text-color="#fff"
        color="#2dce89"
        @click="handleUpdateClick()"
      >
        Update
      </va-button>
    </template>
  </va-modal>

  <ManagementBase>
    <template #detail>
      <!-- Task Detail ans Attachment section -->
      <section class="grid grid-cols-12 gap-7 min-h-[25vh]">
        <!-- detail Task information -->
        <div class="col-span-8 rounded-xl p-7 shadow-sm bg-white">
          <h2 class="text-3xl font-bold">
            <i
              class="fa-solid fa-arrow-right-to-bracket cursor-pointer text-[#2dce89] transition-all hover:scale-x-105 ease-in-out hover:-translate-x-2"
              @click="router.back()"
            ></i>
            <span class="ml-5 text-[#2dce89]">Task Detail</span>
            <span class="ml-2 text-sm text-slate-400 uppercase"
              >id: {{ item?.taskId }}</span
            >
          </h2>

          <div class="grid grid-cols-2 mt-3">
            <div class="col-span-1 text-left">
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Title:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.taskTitle }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Content:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.taskContent }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Start Date:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.startDate }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Due Date:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.endDate }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Level:</span
                >
                <div class="text-base inline-block ml-3">
                  <!-- {{ item?.taskLevel }} -->

                  <div
                    class="text-sm flex items-center justify-center px-3 rounded-lg bg-white border"
                    :class="{
                      'text-red-500': item?.taskLevel == 3,
                      'text-green-500': item?.taskLevel == 1,
                      'text-gray-500': item?.taskLevel == 2,
                    }"
                  >
                    <div class="w-full py-1">
                      <i
                        class="fa-solid"
                        :class="{
                          'fa-book': item?.taskLevel == 3,
                          'fa-calendar-days': item?.taskLevel == 1,
                          'fa-building': item?.taskLevel == 2,
                        }"
                      ></i>
                      <span class="ml-3">{{
                        item?.taskLevel == 1
                          ? 'Semester'
                          : item?.taskLevel == 2
                          ? 'Department'
                          : 'Subject'
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Created By(Id):</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.createdBy }}
                </div>
              </div>
            </div>

            <div class="col-span-1 text-left">
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Status:</span
                >
                <div class="text-base inline-block ml-3">
                  <i
                    class="text-sm fa-solid fa-circle"
                    :class="{
                      'text-slate-400': item?.taskStatus == 0,
                      'text-blue-400': item?.taskStatus == 1,
                      'text-yellow-400': item?.taskStatus == 2,
                      'text-green-400': item?.taskStatus == 3,
                    }"
                  ></i>
                  <span
                    class="ml-3"
                    :class="{
                      'text-slate-400': item?.taskStatus == 0,
                      'text-blue-400': item?.taskStatus == 1,
                      'text-yellow-400': item?.taskStatus == 2,
                      'text-green-400': item?.taskStatus == 3,
                    }"
                    >{{
                      item?.taskStatus == 0
                        ? 'Undefined'
                        : item?.taskStatus == 1
                        ? 'Todo'
                        : item?.taskStatus == 2
                        ? 'In Progress'
                        : 'End'
                    }}</span
                  >
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Location:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.location }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Semester:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.semester?.semesterCode }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Department:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.department?.departmentCode }} -
                  {{ item?.department?.departmentName }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Subject:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.subject?.subjectCode }} -
                  {{ item?.subject?.subjectName }}
                </div>
              </div>
              <div class="w-full py-1">
                <span
                  class="text-sm text-slate-400 uppercase inline-block w-[150px]"
                  >Created At:</span
                >
                <div class="text-base inline-block ml-3">
                  {{ item?.createdAt }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- attachemnts -->
        <div class="col-span-4 rounded-xl p-7 shadow-sm bg-white">
          <h2 class="text-2xl font-bold text-center text-rose-500">
            <i class="fa-solid fa-file"></i>
            <span class="ml-3">Attachment</span>
          </h2>

          <div class="flex items-center justify-center flex-col mt-3">
            <div
              v-if="item.attachments.length == 0"
              class="text-center text-base text-slate-500"
            >
              There is no attachments
            </div>
            <div
              v-for="file in item.attachments"
              :key="file.attachmentId"
              class="w-full border border-slate-200 flex items-center justify-between rounded-lg px-3 py-3 my-1 hover:bg-slate-50 transition-all ease-linear cursor-pointer hover:scale-105"
            >
              <div class="font-bold text-red-400">
                <i class="fa-solid fa-file-pdf"></i> {{ file.fileName }}
              </div>
              <div>
                <a :href="file.url" target="_blank"
                  >File: <i class="fa-solid fa-file-arrow-down"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template #header_add>
      <button
        class="w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
        @click.prevent="showCreateModal = !showCreateModal"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add Task Activity</span>
      </button>
    </template>
    <template #main>
      <va-data-table
        :items="itemActivities"
        :columns="columns"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        :style="{ '--va-data-table-thead-color': '#8392ab' }"
      >
        <template #cell(taskActivityStatus)="{ value }">
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

        <template #cell(activityTitle)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(activityDescription)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(deadline)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(taskLecturer)="{ rowData }">
          <div class="flex items-center justify-start">
            <img
              class="w-6 h-6 rounded-xl object-cover"
              :src="(rowData?.taskLecturer?.lecturer as LecturerModel).filePath"
              alt="User Avatar"
            />
            <div class="ml-3">
              <div class="text-sm">
                {{
                  (rowData?.taskLecturer?.lecturer as LecturerModel).displayName
                }}
              </div>
              <div class="text-sm text-gray-400">
                {{ (rowData?.taskLecturer?.lecturer as LecturerModel).email }}
              </div>
            </div>
          </div>
        </template>

        <template #cell(actions)="{ rowData }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <!-- <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click.prevent=""
              /> -->
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
                @click="
                  () => {
                    showEditModal = true
                    selectedItem = rowData as TaskActivityModel
                    mapEdditedItem(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="
                  () => {
                    selectedItem = rowData as TaskActivityModel
                    handleDeleteClick()
                  }
                "
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
  import type {
    TaskModel,
    TaskLecturerModel,
    TaskActivityModel,
    LecturerModel,
  } from './manageModel'
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import router from '@/router'

  import { useModal, useToast } from 'vuestic-ui'

  const columns = ref([
    { key: 'activityTitle', label: 'Title' },
    { key: 'activityDescription', label: 'Description' },
    { key: 'deadline', label: 'Due' },
    { key: 'taskLecturer', label: 'Lecturer' },
    { key: 'taskActivityStatus', label: 'Status' },
    { key: 'actions', label: '' },
  ])

  onMounted(() => {
    fetchTask()
  })

  const route = useRoute()

  const itemLecturer = ref<Array<TaskLecturerModel>>([])
  const itemActivities = ref<Array<TaskActivityModel>>([])
  const item = ref<TaskModel>({
    taskId: 0,
    taskTitle: '',
    taskContent: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    taskLevel: 0,
    taskStatus: 0,
    location: '',
    semester: undefined,
    department: undefined,
    subject: undefined,
    taskLecturers: [],
    attachments: [],
    createdBy: '',
    createdAt: new Date().toISOString().slice(0, 10),
  })
  const selectedItem = ref<TaskActivityModel>()
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showEditModal = ref(false)
  const showCreateModal = ref(false)

  const createItem = ref<TaskActivityRequestmodel>({
    ActivityTitle: '',
    activityDescription: '',
    deadline: new Date().toISOString().slice(0, 10),
    taskLecturerId: 0,
  })

  const edittedItem = ref<TaskActivityRequestmodel>({
    ActivityTitle: '',
    activityDescription: '',
    deadline: new Date().toISOString().slice(0, 10),
    taskLecturerId: 0,
  })

  async function fetchTask() {
    try {
      const response = await axios.get(`/api/tasks/${route.params?.task_id}`)
      const json = response.data
      item.value = (await json) as TaskModel

      item.value.startDate = new Date(item.value.startDate)
        .toISOString()
        .slice(0, 10)
      item.value.endDate = new Date(item.value.endDate)
        .toISOString()
        .slice(0, 10)
      item.value.createdAt = new Date(item.value.createdAt)
        .toISOString()
        .slice(0, 10)

      itemLecturer.value = item.value.taskLecturers

      // reset activites
      itemActivities.value = []
      itemLecturer.value.forEach((taskLecturer) => {
        fetchTaskLecturer(taskLecturer)
      })
      createItem.value.taskLecturerId = itemLecturer.value[0].taskLecturerId

      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchTaskLecturer(taskLecturer: TaskLecturerModel) {
    const response = await axios.get(
      `/api/task-lecturers/${taskLecturer.taskLecturerId}`,
    )
    const json = (await response.data) as TaskLecturerModel
    for (const activity of json.taskActivities) {
      // itemActivities.value.push(activity)

      const response = await axios.get(
        `/api/task-activities/${activity.taskActivityId}`,
      )
      const json = (await response.data) as TaskActivityModel
      json.deadline = new Date().toISOString().slice(0, 10)
      json.taskLecturer = taskLecturer // hack

      itemActivities.value.push(json)
    }
  }

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(itemLecturer.value.length / perPage.value)
      : itemLecturer.value.length
  })

  const { confirm } = useModal()
  const { init } = useToast()

  async function handleCreateClick() {
    try {
      const response = await axios.post(
        `/api/task-activities`,
        JSON.stringify(createItem.value),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      const responseData = (await response.data) as TaskActivityModel
      // TODO: response data have value of TaskActivityModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showCreateModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Task Activity Create Message',
          message: `Create Task Activity: "${createItem.value.ActivityTitle}" successfully!`,
          color: '#2dd4bf',
        })

        // clear Input
        clearInputCreateModel()

        // delete successful && load data
        fetchTask()
      }
    } catch (error) {
      alert(error)
    }
  }

  function updateEdited(
    editted: TaskActivityRequestmodel,
    selected: TaskActivityModel,
  ) {
    // Loop through each property
    Object.keys(editted).forEach((key) => {
      // Check if property value is different from selected
      if (editted[key] !== selected[key]) {
        // Property has been updated, keep value
        return
      }

      // Property is unchanged, set to undefined
      editted[key] = undefined
    })

    return editted
  }

  async function handleUpdateClick() {
    const editted = edittedItem.value as TaskActivityRequestmodel
    const selected = selectedItem.value as TaskActivityModel

    updateEdited(editted, selected)

    try {
      const response = await axios.put(
        `/api/task-activities/${selectedItem.value?.taskActivityId}`,
        JSON.stringify(edittedItem.value),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      const responseData = (await response.data) as TaskActivityModel
      // TODO: response data have value of TaskActivityModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showEditModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Task Activity Update Message',
          message: `Update Task Activity: "${edittedItem.value.ActivityTitle}" successfully!`,
          color: '#facc15',
        })

        // delete successful && load data
        fetchTask()
      }
    } catch (error) {
      alert(error)
    }
  }

  async function handleDeleteClick() {
    const result = await confirm({
      message: `Are you sure to delete this Task Activity ${selectedItem.value?.activityTitle} - ${selectedItem.value?.taskLecturer.lecturer?.displayName}`,
      title: 'Task Activity delete confirmation',
      okText: 'Delete',
      cancelText: 'Cancel',
      blur: true,
    })

    if (result) {
      try {
        // user confirm delete
        const response = await axios.delete(
          `/api/task-activities?id=${selectedItem.value?.taskActivityId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        const responseData: TaskActivityErrorResponseModel = response.data
        if (responseData.isSuccess) {
          // toast message
          init({
            title: 'Task Activity Delete Message',
            message: `Delete Task Activity: "${selectedItem.value?.activityTitle}" successfully!`,
            color: '#f43f5e',
          })

          // delete successful && load data
          fetchTask()
        } else {
          console.log(`Error from Response(origin): ${response}`)
          console.log(
            `Request to delete Failed with message: ${responseData.message}`,
          )
          console.log(`Error Detail: ${responseData.errors}`)
        }
      } catch (error) {
        alert(error)
      }
    }
  }

  function mapEdditedItem(data: TaskActivityModel) {
    const item = edittedItem.value
    item.ActivityTitle = data.activityTitle
    item.activityDescription = data.activityDescription
    item.deadline = data.deadline
    item.taskLecturerId = data.taskLecturer.taskLecturerId
  }

  function clearInputCreateModel() {
    const item = createItem.value
    item.ActivityTitle = ''
    item.activityDescription = ''
    item.deadline = new Date('2020-01-01')
    item.taskLecturerId = 0
  }

  interface TaskActivityErrorResponseModel {
    isSuccess: boolean
    message: string
    errors: Array<string>
  }

  interface TaskActivityRequestmodel {
    [key: string]: any

    ActivityTitle?: string
    activityDescription?: string
    deadline?: Date | string
    taskLecturerId?: number
  }
</script>
