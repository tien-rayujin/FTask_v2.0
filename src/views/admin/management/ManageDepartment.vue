<template>
  <!-- {{ items }} -->
  <!-- <p>Create Item{{ createItem }}</p>
  <p>Selected Item{{ selectedItem?.departmentId }}</p>
  <p>Editted Item{{ edittedItem }}</p> -->
  <!-- <p>{{ lecturerOptions }}</p> -->
  <va-modal v-model="showEditModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Department Detail</h2>
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
            <span class="block text-sm text-slate-400">Name</span>
            <input
              v-model="edittedItem.departmentName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Code</span>
            <input
              v-model="edittedItem.departmentCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3"
              >Department Head</span
            >
            <va-select
              v-model="edittedItem.departmentHeadId"
              :options="lecturerOptions"
              class="w-full"
              text-by="displayName"
              value-by="id"
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
        <h2 class="uppercase font-semibold">Department Create</h2>
      </div>
    </template>
    <template #default>
      <div
        class="w-[600px] h-fit relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Name</span>
            <input
              v-model="createItem.departmentName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Code</span>
            <input
              v-model="createItem.departmentCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3"
              >Department Head</span
            >
            <va-select
              v-model="createItem.departmentHeadId"
              :options="lecturerOptions"
              class="w-full"
              text-by="displayName"
              value-by="id"
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
        Select Department
      </p>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Ex: Thiết kế Mỹ thuật số"
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
        <span class="block ml-2">Add Department</span>
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
        <template #cell(departmentName)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(departmentCode)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(departmentHead)="{ rowData }">
          <span class="text-sm">{{ rowData.departmentHead?.displayName }}</span>
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
                    selectedItem = rowData as DepartmentModel
                    mapEdditedItem(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="
                  () => {
                    selectedItem = rowData as DepartmentModel
                    handleDeletelick()
                  }
                "
              />
            </div>
          </div>
        </template>
      </va-data-table>
    </template>
    <template #footer>
      <div class="flex justify-center my-4 text-white">
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
  import type { LecturerModel, DepartmentModel } from './manageModel'
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  import { useModal, useToast } from 'vuestic-ui'

  const columns = ref([
    { key: 'departmentName', label: 'Department Name' },
    { key: 'departmentCode', label: 'Department Code' },
    { key: 'departmentHead', label: 'Department Head' },
    { key: 'createdBy', label: 'Create By' },
    { key: 'createdAt', label: 'Create Date' },
    { key: 'actions', label: '' },
  ])

  const items = ref<DepartmentModel[]>([])
  const lecturerOptions = ref<LecturerModel[]>([])
  const selectedItem = ref<DepartmentModel>()
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showEditModal = ref(false)
  const showCreateModal = ref(false)
  const toggleEditMode = ref(false)

  const edittedItem = ref<DepartmentRequestModel>({
    departmentName: '',
    departmentCode: '',
    departmentHeadId: '',
  })

  const createItem = ref<DepartmentRequestModel>({
    departmentName: '',
    departmentCode: '',
    departmentHeadId: '',
  })

  onMounted(() => {
    fetchDepartments()
    fetchLecturers()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })
  async function fetchDepartments() {
    try {
      const response = await axios.get('/api/departments?page=1&quantity=10')
      const json = response.data
      items.value = (json as Array<DepartmentModel>).map((item) => {
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
        return item
      })
      console.log('API Department:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchLecturers() {
    try {
      const response = await axios.get('/api/lecturers?page=1&amount=50')
      const json = response.data
      lecturerOptions.value = json as Array<LecturerModel>

      // map initial data
      edittedItem.value.departmentHeadId = lecturerOptions.value[0].id
      createItem.value.departmentHeadId = lecturerOptions.value[0].id

      console.log('From Department get options Lecturer:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const { confirm } = useModal()
  const { init } = useToast()

  async function handleCreateClick() {
    try {
      await axios
        .post(`/api/departments`, JSON.stringify(createItem.value), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const responseData = response.data as DepartmentModel

          // close modal
          showCreateModal.value = false

          if (responseData) {
            // toast message
            init({
              title: 'Department Create Message',
              message: `Create Department: "${createItem.value.departmentName}" successfully!`,
              color: '#2dd4bf',
            })

            // clear input
            clearInputCreateModel()

            // delete successful && load data
            fetchDepartments()
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
      alert(error)
    }
  }

  function updateEdited(
    editted: DepartmentRequestModel,
    selected: DepartmentModel,
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
    const editted = edittedItem.value as DepartmentRequestModel
    const selected = selectedItem.value as DepartmentModel

    // property
    updateEdited(editted, selected)

    // nested property
    if (editted.departmentHeadId == selected.departmentHead?.id) {
      editted.departmentHeadId = undefined
    }

    try {
      await axios
        .put(
          `/api/departments/${selectedItem.value?.departmentId}`,
          JSON.stringify(edittedItem.value),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          const responseData = response.data as DepartmentModel

          // close modal
          showEditModal.value = false

          if (responseData) {
            // toast message
            init({
              title: 'Department Update Message',
              message: `Update Department: "${createItem.value.departmentName}" successfully!`,
              color: '#facc15',
            })

            // delete successful && load data
            fetchDepartments()
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
      alert(error)
    }
  }

  async function handleDeletelick() {
    const result = await confirm({
      message: `Are you sure to delete this Department ${selectedItem.value?.departmentCode} - ${selectedItem.value?.departmentName}`,
      title: 'Department delete confirmation',
      okText: 'Delete',
      cancelText: 'Cancel',
      blur: true,
    })

    if (result) {
      try {
        // user confirm delete
        await axios
          .delete(`/api/departments?id=${selectedItem.value?.departmentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(() => {
            // delete successful && load data
            fetchDepartments()

            // toast message
            init({
              title: 'Department Delete Message',
              message: `Delete Department: "${selectedItem.value?.departmentName}" successfully!`,
              color: '#f43f5e',
            })
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
        alert(error)
      }
    }
  }

  function mapEdditedItem(data: DepartmentModel) {
    const item = edittedItem.value
    item.departmentCode = data.departmentCode
    item.departmentHeadId = data.departmentHead?.id as string
    item.departmentName = data.departmentName
  }

  function clearInputCreateModel() {
    const item = createItem.value
    item.departmentCode = ''
    item.departmentHeadId = ''
    item.departmentName = ''
  }

  interface ErrorResponseModel {
    [key: string]: any

    isSuccess: boolean
    message: string
    errors: { [key: string]: any }
  }

  interface DepartmentRequestModel {
    [key: string]: any

    departmentName?: string
    departmentCode?: string
    departmentHeadId?: string
  }
</script>
