<template>
  <!-- <p>taskItem: {{ taskItem }}</p> -->
  <!-- <p>lastTLec: {{ lastTaskLecturer }}</p> -->
  <!-- <p>lastTAc: {{ lastTaskActivity }}</p> -->
  <!-- <p>emptyTaskLecturer {{ emptyTaskLecturer }}</p> -->
  <!-- modal add task lecturer -->
  <va-modal
    v-model="createTaskLecturerModal"
    hide-default-actions
    overlay-opacity="0.2"
    size="large"
    :no-dismiss="true"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400 w-[900px]"
      >
        <h2 class="uppercase font-semibold">
          <span v-if="!isTaskLecturerEditMode">Assign Task</span>
          <span v-else>Update Assigned Task</span>
        </h2>
      </div>
    </template>
    <template #default>
      <div class="grid grid-cols-12 gap-5 mb-5 bg-white w-full h-fit p-6">
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Assignee</span
          >
          <select
            v-model="currentTaskLecturer.LecturerId"
            class="border border-slate-300 p-3 w-full"
          >
            <option value="" disabled selected>Select Assignee</option>
            <option
              v-for="lecturer in lecturerOptions"
              :key="lecturer.id"
              :value="lecturer.id"
            >
              {{ lecturer.email }}
            </option>
          </select>
        </div>
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Note</span
          >
          <input
            v-model="currentTaskLecturer.note"
            type="text"
            placeholder="Ex: Prepare for seminar..."
            class="border border-slate-300 p-3 w-full"
          />
        </div>
        <div class="relative col-span-12 border border-slate-300 p-3">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Activities</span
          >
          <span
            class="absolute -top-3 right-3 font-semibold rounded-xl text-white bg-[#2dce89] w-fit flex items-center justify-center cursor-pointer py-2 px-3"
            @click="
              () => {
                // reset current acitvity
                currrentTaskActivity = {
                  activityTitle: '',
                  activityDescription: '',
                  deadline: new Date().toISOString(),
                }

                isTaskActivityEditMode = false

                createTaskActivityModal = true
              }
            "
            ><i class="fa-solid fa-plus me-2"></i>Add</span
          >
          <div
            class="grid grid-cols-12 gap-5 p-6 w-full h-fit border border-slate-300"
          >
            <div class="relative col-span-12">
              <va-data-table
                :items="currentTaskLecturer.TaskActivities"
                :columns="[
                  { key: 'activityTitle' },
                  { key: 'activityDescription' },
                  { key: 'deadline' },
                  { key: 'action' },
                ]"
                striped
                :style="{ '--va-data-table-thead-color': '#8392ab' }"
              >
                <template #cell(title)="{ value }">
                  <span class="text-sm">{{ value }}</span>
                </template>
                <template #cell(description)="{ value }">
                  <span class="text-sm">{{ value }}</span>
                </template>
                <template #cell(deadline)="{ value }">
                  <span class="text-sm">{{ value }}</span>
                </template>
                <template #cell(action)="{ rowIndex }">
                  <div class="flex items-center justify-start">
                    <ActionButtonBase
                      icon="fa-solid fa-pen"
                      color="text-yellow-400"
                      @click="
                        () => {
                          // user update activity on current TaskLecturer with specific index
                          currrentTaskActivity =
                            currentTaskLecturer.TaskActivities[rowIndex]
                          currentSelectedTaskActivityIndex = rowIndex

                          isTaskActivityEditMode = true

                          createTaskActivityModal = true
                        }
                      "
                    >
                      <i class="fa-solid fa-pen"></i>
                    </ActionButtonBase>
                    <ActionButtonBase
                      icon="fa-solid fa-ban"
                      color="text-red-400"
                      @click="
                        () => {
                          // user delete activity on current TaskLecturer with specific index
                          currrentTaskActivity =
                            currentTaskLecturer.TaskActivities[rowIndex]
                          currentSelectedTaskActivityIndex = rowIndex

                          const result = confirm({
                            message: `Are you sure to delete this activity ${currrentTaskActivity.activityTitle} - ${currrentTaskActivity.deadline}`,
                            title: 'Activity delete confirmation',
                            okText: 'Delete',
                            cancelText: 'Cancel',
                            blur: true,
                          }).then((value: boolean) => {
                            if (value) {
                              currentTaskLecturer.TaskActivities.splice(
                                currentSelectedTaskActivityIndex,
                                1,
                              )

                              init({
                                title: 'Activity Delete Message',
                                message: `Delete Activity ${currrentTaskActivity.activityTitle} successfully!`,
                                color: '#f43f5e',
                              })
                            }
                          })
                        }
                      "
                    >
                      <i class="fa-solid fa-trash"></i>
                    </ActionButtonBase>
                  </div>
                </template>
              </va-data-table>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <va-button
        color="#fcfcfc"
        text-color="#797f8a"
        @click="
          () => {
            createTaskLecturerModal = false
          }
        "
      >
        Cancel
      </va-button>
      <va-button
        class="ml-5"
        text-color="#fff"
        color="#2dce89"
        @click="
          () => {
            if (!isTaskLecturerEditMode) {
              // user add, add current TaskLecturer to taskItem
              taskItem.taskLecturers.push(currentTaskLecturer)

              init({
                title: 'Assign Task Message',
                message: `Assign Task successfully!`,
                color: '#2dd4bf',
              })
            } else {
              // user update, update current activity to current task lecturer
              taskItem.taskLecturers.splice(
                currentSelectedTaskLecturerIndex,
                1,
                currentTaskLecturer,
              )

              init({
                title: 'Assigned Task Update Message',
                message: `Update Assigned Task successfully!`,
                color: '#facc15',
              })
            }
            createTaskLecturerModal = false
          }
        "
      >
        <span v-if="!isTaskLecturerEditMode">Add</span>
        <span v-else>Update</span>
      </va-button>
      <!-- <p>taskItem: {{ taskItem }}</p> -->
    </template>
  </va-modal>

  <!-- modal add activities -->
  <va-modal
    v-model="createTaskActivityModal"
    hide-default-actions
    overlay-opacity="0.2"
    :no-dismiss="true"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400 w-[400px]"
      >
        <h2 class="uppercase font-semibold">
          <span v-if="!isTaskActivityEditMode">Assign</span>
          <span v-else>Update</span>
          Task Activities
        </h2>
      </div>
    </template>
    <template #default>
      <div class="grid grid-cols-12 gap-5 mb-5 bg-white w-full h-fit p-6">
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Title</span
          >
          <input
            v-model="currrentTaskActivity.activityTitle"
            type="text"
            placeholder="Ex: Prepare for seminar..."
            class="border border-slate-300 p-3 w-full"
          />
        </div>
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Content</span
          >
          <input
            v-model="currrentTaskActivity.activityDescription"
            type="text"
            placeholder="Ex: Prepare for seminar..."
            class="border border-slate-300 p-3 w-full"
          />
        </div>
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Deadline</span
          >
          <input
            v-model="currrentTaskActivity.deadline"
            type="datetime-local"
            placeholder="Ex: Prepare for seminar..."
            class="border border-slate-300 p-3 w-full"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <va-button
        color="#fcfcfc"
        text-color="#797f8a"
        @click="
          () => {
            createTaskActivityModal = false
          }
        "
      >
        Cancel
      </va-button>
      <va-button
        class="ml-5"
        text-color="#fff"
        color="#2dce89"
        @click="
          () => {
            if (!isTaskActivityEditMode) {
              // user add, add current activity to current task lecturer
              currentTaskLecturer.TaskActivities.push(currrentTaskActivity)

              init({
                title: 'Activity Create Message',
                message: `Create Activity ${currrentTaskActivity.activityTitle} successfully!`,
                color: '#2dd4bf',
              })
            } else {
              // user update, update current activity to current task lecturer
              currentTaskLecturer.TaskActivities.splice(
                currentSelectedTaskActivityIndex,
                1,
                currrentTaskActivity,
              )

              init({
                title: 'Activity Update Message',
                message: `Update Activity ${currrentTaskActivity.activityTitle} successfully!`,
                color: '#facc15',
              })
            }
            createTaskActivityModal = false
          }
        "
      >
        <span v-if="!isTaskActivityEditMode">Add</span>
        <span v-else>Update</span>
      </va-button>
      <!-- <p>currentActivity: {{ currrentTaskActivity }}</p> -->
    </template>
  </va-modal>

  <ManagementBaseVue>
    <template #detail>
      <div class="w-full h-fit">
        <h1 class="text-2xl font-bold mb-3 text-white">Create Task</h1>
        <div class="grid grid-cols-12 gap-5">
          <!-- detail task -->
          <div
            class="col-span-8 bg-white rounded-xl p-6 grid grid-cols-12 gap-5"
          >
            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Title</span
              >
              <input
                v-model="taskItem.taskTitle"
                required
                type="text"
                placeholder="Ex: Prepare for seminar"
                class="border border-slate-300 p-3 w-full"
              />
            </div>
            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Start Date</span
              >
              <input
                v-model="taskItem.startDate"
                required
                type="datetime-local"
                class="border border-slate-300 p-3 w-full"
              />
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Description</span
              >
              <input
                v-model="taskItem.taskContent"
                type="text"
                placeholder="Ex: Prepare document, pdf, resource file for seminar"
                class="border border-slate-300 p-3 w-full"
              />
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Due Date</span
              >
              <input
                v-model="taskItem.endDate"
                required
                type="datetime-local"
                class="border border-slate-300 p-3 w-full"
              />
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Subject</span
              >
              <select
                v-model="taskItem.subjectId"
                required
                class="border border-slate-300 p-3 w-full"
              >
                <option value="" disabled selected>Select Task Subject</option>
                <option
                  v-for="subject in subjectOptions"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                >
                  {{ subject.subjectCode }}
                </option>
              </select>
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Department</span
              >
              <select
                v-model="taskItem.departmentId"
                required
                class="border border-slate-300 p-3 w-full"
              >
                <option value="" disabled selected>
                  Select Task Department
                </option>
                <option
                  v-for="department in departmentOptions"
                  :key="department.departmentId"
                  :value="department.departmentId"
                >
                  {{ department.departmentCode }}
                </option>
              </select>
            </div>
          </div>

          <!-- attachment and chart -->
          <div
            class="col-span-4 bg-white rounded-xl p-6 grid grid-cols-12 gap-0"
          >
            <div class="relative col-span-12">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Select attachments</span
              >
              <input
                type="file"
                multiple
                placeholder="Ex: Prepare for seminar"
                class="border border-slate-300 p-3 w-full"
                @change="(e) => onFileSelect(e.target)"
              />
            </div>

            <!-- <div>arrImgReview {{ arrImgReview }}</div> -->
            <div class="col-span-12 flex items-center justify-around flex-wrap">
              <div
                v-for="(file, idx) in arrImgReview"
                :key="idx"
                class="col-auto"
              >
                <div
                  class="flex flex-col items-center justify-center w-full relative"
                >
                  <img
                    v-if="file.type.includes('image')"
                    :src="file.imgUrl"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <img
                    v-else-if="file.type.includes('spreadsheetml.sheet')"
                    src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-microsoft-excel-logo-icon-png-image_3588803.jpg"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <img
                    v-else-if="file.type.includes('wordprocessingml.document')"
                    src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-docx-file-document-icon-png-image_4187779.jpg"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <img
                    v-else-if="
                      file.type.includes('presentationml.presentation')
                    "
                    src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-powerpoint--icon-png-image_3588809.jpg"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <img
                    v-else-if="file.type.includes('pdf')"
                    src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-pptx-file-document-icon-png-image_4172359.jpg"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <img
                    v-else
                    src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-file-icon-png-image_4419863.jpg"
                    class="w-20 h-20 object-cover p-2"
                    :title="file.name"
                  />
                  <!-- <span class="text-sm inline-block">{{ file.name }}</span> -->
                  <!-- <span class="inline-block">{{ file.type }}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #header>
      <h1
        class="text-2xl font-bold text-[#2dce89] w-full h-full flex items-center justify-start"
      >
        Create Activities
      </h1>
    </template>

    <template #header_add>
      <button
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-300 to-green-400 p-3 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200"
        @click="
          () => {
            // reset task lecturer
            currentTaskLecturer = {
              LecturerId: '',
              note: '',
              TaskActivities: [],
            }

            isTaskLecturerEditMode = false

            createTaskLecturerModal = true
          }
        "
      >
        <i class="fa-solid fa-plus me-2"></i>
        Add New Activity
      </button>
    </template>

    <template #main>
      <div class="w-full min-h-[25vh]">
        <va-data-table
          :items="
            [...taskItem.taskLecturers].map((lecturer) => {
              const matched = lecturerOptions.find(
                (opt) => opt.id == lecturer.LecturerId,
              )
              return {
                ...lecturer,
                lecturer: matched,
              }
            })
          "
          :columns="[
            { key: 'lecturer' },
            { key: 'note' },
            { key: 'TaskActivities', label: 'Activity Count' },
            { key: 'actions' },
          ]"
          striped
          :style="{ '--va-data-table-thead-color': '#8392ab' }"
        >
          <template #cell(lecturer)="{ rowData }">
            <div class="flex items-center justify-start">
              <img
                class="w-6 h-6 rounded-xl object-cover"
                :src="(rowData?.lecturer as LecturerModel).filePath"
                alt="User Avatar"
              />
              <div class="ml-3">
                <div class="text-sm">
                  {{ (rowData?.lecturer as LecturerModel).displayName }}
                </div>
                <div class="text-sm text-gray-400">
                  {{ (rowData?.lecturer as LecturerModel).email }}
                </div>
              </div>
            </div>
          </template>
          <template #cell(note)="{ value }">
            <span class="text-sm">{{ value }}</span>
          </template>
          <template #cell(TaskActivities)="{ rowData }">
            <span class="text-sm">{{ rowData.TaskActivities.length }}</span>
          </template>
          <template #cell(actions)="{ rowIndex }">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
                @click="
                  () => {
                    // user update assigned task on current taskItem with specific index
                    currentTaskLecturer = taskItem.taskLecturers[rowIndex]
                    currentSelectedTaskLecturerIndex = rowIndex

                    isTaskLecturerEditMode = true

                    createTaskLecturerModal = true
                  }
                "
              >
                <i class="fa-solid fa-pen"></i>
              </ActionButtonBase>
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="
                  () => {
                    // user delete assigned task on current taskItem with specific index
                    currentTaskLecturer = taskItem.taskLecturers[rowIndex]
                    currentSelectedTaskLecturerIndex = rowIndex

                    const result = confirm({
                      message: `Are you sure to delete this assigned task ?`,
                      title: 'Assigned Task delete confirmation',
                      okText: 'Delete',
                      cancelText: 'Cancel',
                      blur: true,
                    }).then((value: boolean) => {
                      if (value) {
                        taskItem.taskLecturers.splice(
                          currentSelectedTaskLecturerIndex,
                          1,
                        )

                        init({
                          title: 'Assigned Task Delete Message',
                          message: `Delete Assigned Task successfully!`,
                          color: '#f43f5e',
                        })
                      }
                    })
                  }
                "
              >
                <i class="fa-solid fa-trash"></i>
              </ActionButtonBase>
            </div>
          </template>
        </va-data-table>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-end">
        <button
          class="py-3 px-6 rounded-xl text-white font-semibold bg-[#2dce89]"
          @click="handleCreateTask"
        >
          Publish Task
        </button>
      </div>
    </template>
  </ManagementBaseVue>
</template>

<script setup lang="ts">
  import ManagementBaseVue from '@/components/admin/ManagementBase.vue'
  import type {
    DepartmentModel,
    LecturerModel,
    SubjectModel,
    TaskModel,
  } from './manageModel'
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useToast, useModal } from 'vuestic-ui'
  import ActionButtonBase from '@/components/admin/ActionButtonBase.vue'
  import { ref as fref, getDownloadURL, uploadBytes } from 'firebase/storage'
  import { storage as fireStorage } from '@/firebase'

  const router = useRouter()
  const { init } = useToast()
  const { confirm } = useModal()

  const arrImgReview = ref<
    Array<{ imgUrl: string; name: string; type: string; original: Blob }>
  >([])

  const taskItem = ref<TaskRequestModel>({
    taskTitle: '',
    taskContent: '',
    startDate: '',
    endDate: '',
    departmentId: '',
    subjectId: '',

    taskLecturers: [],
    filePath: [],
  })

  const currentTaskLecturer = ref<TaskLecturerRequestModel>({
    LecturerId: '',
    note: '',
    TaskActivities: [],
  })

  const currrentTaskActivity = ref<TaskActivityRequestModel>({
    activityTitle: '',
    activityDescription: '',
    deadline: '',
  })

  const lecturerOptions = ref<Array<LecturerModel>>([])
  const subjectOptions = ref<Array<SubjectModel>>([])
  const departmentOptions = ref<Array<DepartmentModel>>([])

  const createTaskLecturerModal = ref(false)
  const createTaskActivityModal = ref(false)
  const isTaskLecturerEditMode = ref(false)
  const currentSelectedTaskLecturerIndex = ref(0)
  const isTaskActivityEditMode = ref(false)
  const currentSelectedTaskActivityIndex = ref(0)

  onMounted(() => {
    fetchLecturers()
    fetchSubjects()
    fetchDepartment()
  })

  function onFileSelect(e: any) {
    arrImgReview.value = []
    for (const file of e.files) {
      const imgUrl = URL.createObjectURL(file)
      arrImgReview.value.push({
        imgUrl,
        name: file.name,
        type: file.type,
        original: file,
      })
    }
  }

  async function fetchLecturers() {
    try {
      const response = await axios.get('/api/lecturers?page=1&quantity=100')
      const json = response.data
      lecturerOptions.value = (json as Array<LecturerModel>).map((item) => {
        item.createdAt = new Date(item.createdAt).toISOString().slice(0, 10)
        return item
      })

      console.log('API Lecturer:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchSubjects() {
    try {
      const response = await axios.get('/api/subjects?page=1&quantity=100')
      const json = response.data
      subjectOptions.value = (json as Array<SubjectModel>).map((item) => {
        item.createdAt = new Date(item.createdAt).toISOString().slice(0, 10)
        return item
      })

      console.log('API Subject:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchDepartment() {
    try {
      const response = await axios.get('/api/departments?page=1&quantity=100')
      const json = response.data
      departmentOptions.value = (json as Array<DepartmentModel>).map((item) => {
        item.createdAt = new Date(item.createdAt).toISOString().slice(0, 10)
        return item
      })

      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const formDataContent = computed(() => {
    const payload = new FormData()
    const item = taskItem.value
    payload.append('taskTitle', item.taskTitle)
    payload.append('taskContent', item.taskContent)
    payload.append('startDate', item.startDate as string)
    payload.append('endDate', item.endDate as string)
    payload.append('departmentId', item.departmentId)
    payload.append('subjectId', item.subjectId)

    payload.append(
      'taskLecturers',
      JSON.stringify(item.taskLecturers) as string,
    )

    // for (let i = 0; i < item.taskLecturers.length; i++) {
    //   payload.append(
    //     'taskLecturers',
    //     JSON.stringify(item.taskLecturers[i]) as string,
    //   )
    // }

    payload.append('filePaths', JSON.stringify(item.filePath) as string)

    return payload
  })

  async function uploadImgFireBase() {
    const fileUpload = [...arrImgReview.value].map((e) => {
      return {
        original: e.original,
        name: e.name,
      }
    })
    taskItem.value.filePath = []

    for (let i = 0; i < fileUpload.length; i++) {
      const storeRef = fref(
        fireStorage,
        `tasks/${taskItem.value.taskTitle}/${fileUpload[i].name}`,
      )
      await uploadBytes(storeRef, fileUpload[i].original).then(
        async (snapshot) => {
          const fireBaseImgUrl = await getDownloadURL(snapshot.ref)
          taskItem.value.filePath.push({
            fileName: fileUpload[i].name,
            URL: fireBaseImgUrl,
          })
        },
      )
    }
  }

  async function handleCreateTask() {
    try {
      await uploadImgFireBase()

      axios
        .post(`/api/tasks`, formDataContent.value, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const responseData = response.data as TaskModel

          if (responseData) {
            // toast message
            init({
              title: 'Task Publish Message',
              message: `Publish Task: "${taskItem.value.taskTitle}" successfully!`,
              color: '#2dd4bf',
            })

            // clear Input
            taskItem.value = {
              taskTitle: '',
              taskContent: '',
              startDate: '',
              endDate: '',
              departmentId: '',
              subjectId: '',

              taskLecturers: [],
              filePath: [],
            }

            router.push({ name: 'taskList' })
          }
        })
        .catch((reason) => {
          const errorResponse = reason.response.data as ErrorResponseModel
          let message = ''
          // Loop through all errors
          Object.keys(errorResponse.errors).forEach((field) => {
            const errors = errorResponse.errors[field]

            // Add each error to the message
            errors.forEach((error: any) => {
              message += `${field}: ${error}\n`
            })
          })

          init({
            title: 'Asign Task Failed!',
            message,
            color: '#f43f5e',
          })
          console.log(errorResponse)
        })
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  interface ErrorResponseModel {
    [key: string]: any

    isSuccess: boolean
    message: string
    errors: { [key: string]: any }
  }

  interface TaskRequestModel {
    [key: string]: any

    taskTitle: string
    taskContent: string
    startDate: Date | string
    endDate: Date | string
    departmentId: string
    subjectId: string

    taskLecturers: Array<TaskLecturerRequestModel>
    filePath: Array<AttachmentRequestModel>
  }

  interface AttachmentRequestModel {
    [key: string]: any

    fileName: string
    URL: string
  }

  interface TaskActivityRequestModel {
    [key: string]: any

    activityTitle: string
    activityDescription: string
    deadline: Date | string
  }

  interface TaskLecturerRequestModel {
    [key: string]: any

    LecturerId: string
    note: string
    TaskActivities: Array<TaskActivityRequestModel>
  }
</script>
