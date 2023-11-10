<template>
  <!-- {{ items }} -->
  <!-- <p>Create Item{{ createItem }}</p>
  <p>Selected Item{{ selectedItem?.semesterId }}</p>
  <p>Editted Item{{ edittedItem }}</p> -->
  <va-modal v-model="showEditModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Semester Detail</h2>
        <div class="text-right w-fit">
          <span class="text-sm text-slate-400 inline-block -translate-y-1/3"
            >View / Edit mode</span
          >
          <va-switch
            v-model="toggleEditMode"
            class="mx-3 inline-block"
            size="small"
            color="#2dce89"
            :style="{
              '--va-switch-checker-background-color': '#FFF',
            }"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div
        class="w-[600px] h-fit relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Semester Code</span>
            <input
              v-model="edittedItem.semesterCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: SU24"
            />
            <span class="block text-sm text-slate-400 mt-3">Start Date</span>
            <input
              v-model="edittedItem.startDate"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3">End Date</span>
            <input
              v-model="edittedItem.endDate"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
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

  <va-modal
    v-model="showCreateModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Semester Create</h2>
      </div>
    </template>
    <template #default>
      <div
        class="w-[600px] h-fit relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Semester Code</span>
            <input
              v-model="createItem.semesterCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: SU24"
            />
            <span class="block text-sm text-slate-400 mt-3">Start Date</span>
            <input
              v-model="createItem.startDate"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3">End Date</span>
            <input
              v-model="createItem.endDate"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
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

  <ManagementBase>
    <template #header>
      <p class="uppercase text-sm pb-1 text-slate-400 font-semibold">
        Select Semester
      </p>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Ex: FA23"
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter> </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
        @click.prevent="showCreateModal = !showCreateModal"
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

        <template #cell(actions)="{ rowData }">
          <div class="w-[60px]">
            <div class="flex items-center justify-center">
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
                @click="
                  () => {
                    showEditModal = true
                    toggleEditMode = true
                    selectedItem = rowData as SemesterModel
                    mapEdditedItem(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="
                  () => {
                    selectedItem = rowData as SemesterModel
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
  import type { SemesterModel } from './manageModel'
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  import { useModal, useToast } from 'vuestic-ui'

  const columns = ref([
    { key: 'semesterCode', label: 'Semester Code' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'Due Date' },
    // { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created Date' },
    { key: 'actions', label: '' },
  ])

  const items = ref<SemesterModel[]>([])
  const selectedItem = ref<SemesterModel>()
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showEditModal = ref(false)
  const showCreateModal = ref(false)
  const toggleEditMode = ref(false)

  const edittedItem = ref<SemesterRequestModel>({
    semesterCode: '',
    startDate: '',
    endDate: '',
  })

  const createItem = ref<SemesterRequestModel>({
    semesterCode: '',
    startDate: '',
    endDate: '',
  })

  onMounted(() => {
    fetchSemesters()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  async function fetchSemesters() {
    try {
      const response = await axios.get('/api/semesters?page=1&quantity=10')
      const json = response.data
      items.value = (json as Array<SemesterModel>).map((item) => {
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
        item.startDate = item.startDate.toLocaleString().slice(0, 10)
        item.endDate = item.endDate.toLocaleString().slice(0, 10)
        return item
      })
      console.log('API Semester:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const { confirm } = useModal()
  const { init } = useToast()

  async function handleCreateClick() {
    try {
      const response = await axios.post(
        `/api/semesters`,
        JSON.stringify(createItem.value),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData = response.data as SemesterModel
      // TODO: response data have value of subjectModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showCreateModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Semester Create Message',
          message: `Create Semester: "${createItem.value.semesterCode}" successfully!`,
          color: '#2dd4bf',
        })

        // clear input
        clearInputCreateModel()

        // delete successful && load data
        fetchSemesters()
      }
    } catch (error) {
      alert(error)
    }
  }

  function updateEdited(
    editted: SemesterRequestModel,
    selected: SemesterModel,
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
    const eddited = edittedItem.value as SemesterRequestModel
    const selected = selectedItem.value as SemesterModel

    updateEdited(eddited, selected)

    try {
      const response = await axios.put(
        `/api/semesters/${selectedItem.value?.semesterId}`,
        JSON.stringify(edittedItem.value),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData = response.data as SemesterModel
      // TODO: response data have value of subjectModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showEditModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Semester Update Message',
          message: `Update Semester: "${createItem.value.semesterCode}" successfully!`,
          color: '#facc15',
        })

        // delete successful && load data
        fetchSemesters()
      }
    } catch (error) {
      alert(error)
    }
  }

  async function handleDeleteClick() {
    const result = await confirm({
      message: `Are you sure to delete this Semester ${selectedItem.value?.semesterCode}`,
      title: 'Semester delete confirmation',
      okText: 'Delete',
      cancelText: 'Cancel',
      blur: true,
    })

    if (result) {
      try {
        // user confirm delete
        const response = await axios.delete(
          `/api/semesters?id=${selectedItem.value?.semesterId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        const responseData: SemesterErrorResponseModel = response.data
        if (responseData.isSuccess) {
          // toast message
          init({
            title: 'Semester Delete Message',
            message: `Delete Semester: "${selectedItem.value?.semesterCode}" successfully!`,
            color: '#f43f5e',
          })

          // delete successful && load data
          fetchSemesters()
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

  function mapEdditedItem(data: SemesterModel) {
    const item = edittedItem.value
    item.semesterCode = data.semesterCode
    item.startDate = data.startDate
    item.endDate = data.endDate
  }

  function clearInputCreateModel() {
    const item = createItem.value
    item.semesterCode = ''
    item.startDate = ''
    item.endDate = ''
  }

  interface SemesterErrorResponseModel {
    isSuccess: boolean
    message: string
    errors: Array<string>
  }

  interface SemesterRequestModel {
    [key: string]: any

    semesterCode: string
    startDate: Date | string
    endDate: Date | string
  }
</script>
