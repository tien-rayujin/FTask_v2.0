<template>
  <!-- {{ items }} -->
  <!-- <p>Create Item{{ createItem }}</p>
  <p>Selected Item{{ selectedItem?.subjectId }}</p>
  <p>Editted Item{{ edittedItem }}</p> -->
  <!-- <p>{{ departmentOptions }}</p> -->

  <va-modal v-model="showEditModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Lecturer Detail</h2>
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
              v-model="edittedItem.subjectName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Code</span>
            <input
              v-model="edittedItem.subjectCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3">Status</span>
            <va-select
              v-model="edittedItem.status"
              :options="statusOptions"
              class="w-full"
            />
            <span class="block text-sm text-slate-400 mt-3">Department</span>
            <va-select
              v-model="edittedItem.departmentId"
              :options="departmentOptions"
              class="w-full"
              text-by="departmentCode"
              value-by="departmentId"
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
        <h2 class="uppercase font-semibold">Lecturer Create</h2>
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
              v-model="createItem.subjectName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: Computer Science Introduction 101"
            />
            <span class="block text-sm text-slate-400 mt-3">Code</span>
            <input
              v-model="createItem.subjectCode"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              placeholder="Ex: CSI101"
            />
            <span class="block text-sm text-slate-400 mt-3">Status</span>
            <va-select
              v-model="createItem.status"
              :options="statusOptions"
              class="w-full"
            />
            <span class="block text-sm text-slate-400 mt-3">Department</span>
            <va-select
              v-model="createItem.departmentId"
              :options="departmentOptions"
              class="w-full"
              text-by="departmentCode"
              value-by="departmentId"
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
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search Subject..."
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
        <span class="block ml-2">Add Subject</span>
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
        <template #cell(subjectName)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(subjectCode)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(department)="{ rowData }">
          <span class="text-sm">{{ rowData.department.departmentName }}</span>
        </template>

        <template #cell(createdBy)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(createdAt)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(status)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template>

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
                    selectedItem = rowData as SubjectModel
                    mapEdditedItem(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="
                  () => {
                    selectedItem = rowData as SubjectModel
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
  import type { DepartmentModel, SubjectModel } from './manageModel'
  import BadgeBase from '@/components/admin/BadgeBase.vue'
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  import { useModal, useToast } from 'vuestic-ui'

  const columns = ref([
    { key: 'subjectName', label: 'Subject Name' },
    { key: 'subjectCode', label: 'Subject Code' },
    { key: 'department', label: 'Department Name' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '' },
  ])

  const items = ref<SubjectModel[]>([])
  const departmentOptions = ref<DepartmentModel[]>([])
  const statusOptions = ref<Array<boolean>>([true, false])
  const selectedItem = ref<SubjectModel>()
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showEditModal = ref(false)
  const showCreateModal = ref(false)
  const toggleEditMode = ref(false)

  const edittedItem = ref<SubjectRequestModel>({
    departmentId: 0,
    subjectName: '',
    subjectCode: '',
    status: true,
  })

  const createItem = ref<SubjectRequestModel>({
    departmentId: 0,
    subjectName: '',
    subjectCode: '',
    status: false,
  })

  onMounted(() => {
    fetchSubjects()
    fetchDepartment()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  async function fetchSubjects() {
    try {
      const response = await axios.get('/api/subjects?page=1&amount=50')
      const json = response.data
      items.value = (json as Array<SubjectModel>).map((item) => {
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
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
      const response = await axios.get('/api/departments?page=1&amount=50')
      const json = response.data
      departmentOptions.value = json as Array<DepartmentModel>

      // map initial data
      edittedItem.value.departmentId = departmentOptions.value[0].departmentId
      createItem.value.departmentId = departmentOptions.value[0].departmentId

      console.log('From Subject get options Department:')
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
        `/api/subjects`,
        JSON.stringify(createItem.value),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const responseData = response.data as SubjectModel
      // TODO: response data have value of subjectModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showCreateModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Subject Create Message',
          message: `Create Subject: "${createItem.value.subjectName}" successfully!`,
          color: '#2dd4bf',
        })

        // clear Input
        clearInputCreateModel()

        // delete successful && load data
        fetchSubjects()
      }
    } catch (error) {
      alert(error)
    }
  }

  function updateEdited(editted: SubjectRequestModel, selected: SubjectModel) {
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
    const eddited = edittedItem.value as SubjectRequestModel
    const selected = selectedItem.value as SubjectModel

    updateEdited(eddited, selected)

    // currently error
    try {
      const response = await axios.put(
        `/api/subjects/${selectedItem.value?.subjectId}`,
        JSON.stringify(edittedItem.value),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData = response.data as SubjectModel
      // TODO: response data have value of subjectModel as create successfull but not yet handle error occur during request || ErrorModel

      // close modal
      showEditModal.value = false

      if (responseData) {
        // toast message
        init({
          title: 'Subject Update Message',
          message: `Update Subject: "${edittedItem.value.subjectName}" successfully!`,
          color: '#facc15',
        })

        // delete successful && load data
        fetchSubjects()
      }
    } catch (error) {
      alert(error)
    }
  }

  async function handleDeleteClick() {
    const result = await confirm({
      message: `Are you sure to delete this Subject ${selectedItem.value?.subjectCode} - ${selectedItem.value?.subjectName}`,
      title: 'Subject delete confirmation',
      okText: 'Delete',
      cancelText: 'Cancel',
      blur: true,
    })

    if (result) {
      try {
        // user confirm delete
        const response = await axios.delete(
          `/api/subjects?id=${selectedItem.value?.subjectId}`,
        )
        const responseData: SubjectErrorResponseModel = response.data
        if (responseData.isSuccess) {
          // toast message
          init({
            title: 'Subject Delete Message',
            message: `Delete Subject: "${selectedItem.value?.subjectName}" successfully!`,
            color: '#f43f5e',
          })

          // delete successful && load data
          fetchSubjects()
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

  function mapEdditedItem(data: SubjectModel) {
    const item = edittedItem.value
    item.subjectName = data.subjectName
    item.subjectCode = data.subjectCode
    item.status = data.status
    item.departmentId = data.department.departmentId
  }

  function clearInputCreateModel() {
    const item = createItem.value
    item.subjectName = ''
    item.subjectCode = ''
    item.status = true
    item.departmentId = departmentOptions.value[0].departmentId
  }

  interface SubjectErrorResponseModel {
    isSuccess: boolean
    message: string
    errors: Array<string>
  }

  interface SubjectRequestModel {
    [key: string]: any

    departmentId?: number
    subjectName?: string
    subjectCode?: string
    status?: boolean
  }
</script>
