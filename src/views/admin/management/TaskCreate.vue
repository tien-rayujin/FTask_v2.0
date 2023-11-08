<template>
  <!-- <span>{{ arrTaskActivity }}</span> -->
  <!-- modal add task lecturer -->
  <va-modal
    v-model="createTaskLecturerModal"
    hide-default-actions
    overlay-opacity="0.2"
    size="large"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400 w-[900px]"
      >
        <h2 class="uppercase font-semibold">Assign Task</h2>
      </div>
    </template>
    <template #default>
      <div class="grid grid-cols-12 gap-5 mb-5 bg-white w-full h-fit p-6">
        <div class="relative col-span-12">
          <span
            class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
            >Assignee</span
          >
          <select class="border border-slate-300 p-3 w-full">
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
            class="absolute -top-3 right-3 font-semibold rounded-full text-white bg-[#2dce89] w-6 h-6 flex items-center justify-center cursor-pointer"
            @click="createTaskActivityModal = !createTaskActivityModal"
            ><i class="fa-solid fa-plus"></i
          ></span>

          <div
            class="grid grid-cols-12 gap-5 p-6 w-full h-fit border border-slate-300"
          >
            <div class="relative col-span-12">
              <va-data-table
                :items="[
                  {
                    title:
                      'ABC create an pdf and pptx file prepare for the seminar',
                    description: 'none',
                    deadline: '2002-02-02 14:30',
                    action: '',
                  },
                  {
                    title: 'ABC',
                    description: 'none',
                    deadline: 'ABC',
                    action: 'ABC',
                  },
                ]"
                :columns="[
                  { key: 'title' },
                  { key: 'description' },
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
                <template #cell(action)="">
                  <button class="text-sm text-yellow-400 me-2">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button class="text-sm text-rose-400">
                    <i class="fa-solid fa-trash"></i>
                  </button>
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
        @click="createTaskLecturerModal = !createTaskLecturerModal"
      >
        Cancel
      </va-button>
      <va-button class="ml-5" text-color="#fff" color="#2dce89">
        Add
      </va-button>
    </template>
  </va-modal>

  <!-- modal add activities -->
  <va-modal
    v-model="createTaskActivityModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400 w-[400px]"
      >
        <h2 class="uppercase font-semibold">Assign Task Activities</h2>
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
        @click="createTaskActivityModal = !createTaskActivityModal"
      >
        Cancel
      </va-button>
      <va-button class="ml-5" text-color="#fff" color="#2dce89">
        Add
      </va-button>
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
                type="text"
                placeholder="Ex: Prepare for seminar"
                class="border border-slate-300 p-3 w-full"
              />
            </div>
            <div class="relative col-span-3">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Start Date</span
              >
              <input type="date" class="border border-slate-300 p-3 w-full" />
            </div>

            <div class="relative col-span-3">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Due Date</span
              >
              <input type="date" class="border border-slate-300 p-3 w-full" />
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Description</span
              >
              <input
                type="text"
                placeholder="Ex: Prepare document, pdf, resource file for seminar"
                class="border border-slate-300 p-3 w-full"
              />
            </div>

            <div class="relative col-span-3">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Start Time</span
              >
              <input type="time" class="border border-slate-300 p-3 w-full" />
            </div>

            <div class="relative col-span-3">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Due Time</span
              >
              <input type="time" class="border border-slate-300 p-3 w-full" />
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Subject</span
              >
              <select class="border border-slate-300 p-3 w-full">
                <option value="" disabled selected>Select Task Subject</option>
              </select>
            </div>

            <div class="relative col-span-6">
              <span
                class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
                >Department</span
              >
              <select class="border border-slate-300 p-3 w-full">
                <option value="" disabled selected>
                  Select Task Department
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
        class="text-2xl font-semibold w-full h-full flex items-center justify-start"
      >
        Create Activities
      </h1>
    </template>

    <template #header_add>
      <button
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-300 to-green-400 p-3 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200"
        @click="createTaskLecturerModal = !createTaskLecturerModal"
      >
        <i class="fa-solid fa-plus me-2"></i>
        Add New Activity
      </button>
    </template>

    <template #main>
      <div class="w-full h-full">
        <div v-if="!arrTaskActivity.length" class="text-center">
          There is no added activity
        </div>
        <!-- Activity List -->
        <div
          v-for="(activity, idx) in arrTaskActivity"
          :key="idx"
          class="grid grid-cols-12 gap-5 mb-5 border border-slate-300 rounded-xl bg-white w-full h-fit p-6"
        >
          <div
            class="relative col-span-2 row-span-2 rounded-xl border border-slate-300"
          >
            <span
              class="w-full h-full flex items-center justify-center text-3xl font-semibold"
              >#{{ idx + 1 }}</span
            >
          </div>
          <div class="relative col-span-5">
            <span
              class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
              >Title</span
            >
            <input
              v-model="activity.activityTitle"
              type="text"
              placeholder="Ex: Prepare for seminar"
              class="border border-slate-300 p-3 w-full"
            />
          </div>
          <div class="relative col-span-3">
            <span
              class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
              >Deadline</span
            >
            <input
              v-model="activity.deadline"
              type="datetime-local"
              class="border border-slate-300 p-3 w-full"
            />
          </div>
          <div class="relative col-span-2">
            <span
              class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
              >Assignee</span
            >
            <select
              v-model="activity.TaskLecturerId"
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
          <div class="relative col-span-8">
            <span
              class="absolute -top-3 left-3 bg-white font-semibold text-slate-400"
              >Description</span
            >
            <input
              v-model="activity.activityDescription"
              type="text"
              placeholder="Ex: Prepare for seminar"
              class="border border-slate-300 p-3 w-full"
            />
          </div>
          <div class="relative col-span-2">
            <button
              type="button"
              class="w-full h-full border border-rose-300 text-rose-300 rounded-xl"
              @click="handleRemoveTaskActivity(idx)"
            >
              <i class="fa-solid fa-trash me-2"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </template>
  </ManagementBaseVue>
</template>

<script setup lang="ts">
  import ManagementBaseVue from '@/components/admin/ManagementBase.vue'
  import type { LecturerModel } from './manageModel'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const arrImgReview = ref<
    Array<{ imgUrl: string; name: string; type: string }>
  >([])
  const arrTaskActivity = ref<Array<TaskActivityRequestModel>>([])
  const arrTaskLecturer = ref<Array<TaskLecturerRequestModel>>([])
  const lecturerOptions = ref<Array<LecturerModel>>([])
  const emptyActivity = {
    activityTitle: '',
    activityDescription: '',
    deadline: new Date().toISOString(),
    TaskLecturerId: '',
  }
  const createTaskLecturerModal = ref(false)
  const createTaskActivityModal = ref(false)

  onMounted(() => {
    fetchLecturers()
    arrTaskActivity.value.push({ ...emptyActivity })
    // console.log('State length array activity: ')
    // console.log(arrTaskActivity.value)
  })

  function onFileSelect(e: any) {
    for (const file of e.files) {
      const imgUrl = URL.createObjectURL(file)
      // console.log('files: ')
      // console.log(file)
      // console.log('img URL:')
      // console.log(imgUrl)
      arrImgReview.value.push({ imgUrl, name: file.name, type: file.type })
    }
  }

  // function handleAddTaskActivity() {
  //   arrTaskActivity.value.push({ ...emptyActivity })
  // }

  function handleRemoveTaskActivity(idx: number) {
    arrTaskActivity.value.splice(idx, 1)
    console.log(arrTaskActivity.value)
  }

  // function getDateTime(date: string, time: string): Date {
  //   return new Date(date + 'T' + time)
  // }

  // console.log(getDateTime('2002-02-02', '18:20'))

  async function fetchLecturers() {
    try {
      const response = await axios.get('/api/lecturers?page=1&quantity=50')
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

  // interface TaskRequestModel {
  //   [key: string]: any

  //   taskTitle: string
  //   taskContent: string
  //   startDate: Date | string
  //   endDate: Date | string
  //   departmentId: string
  //   subjectId: string
  // }

  interface TaskActivityRequestModel {
    [key: string]: any

    activityTitle: string
    activityDescription: string
    deadline: Date | string
  }

  interface TaskLecturerRequestModel {
    [key: string]: any

    LecturerId: string
    TaskActivities: Array<TaskActivityRequestModel>
  }
</script>
