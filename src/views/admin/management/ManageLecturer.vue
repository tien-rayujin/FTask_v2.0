<template>
  <!-- {{ items }} -->
  <va-modal v-model="showEditModel" hide-default-actions overlay-opacity="0.2">
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
        class="w-[600px] h-[450px] relative flex items-center justify-center overflow-hidden"
      >
        <div class="h-full w-1/2 flex items-center justify-center">
          <div class="w-full h-full p-5">
            <img
              class="w-full h-full object-cover rounded-xl shadow-sm shadow-slate-500"
              :src="selectedItem?.filePath"
              alt="user profile image"
            />
          </div>
        </div>
        <div class="h-full w-1/2 flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Email</span>
            <input
              v-model="edittedItem.email"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
            />
            <span class="block text-sm text-slate-400 mt-3">Name</span>
            <input
              v-model="edittedItem.displayName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
            />
            <span class="block text-sm text-slate-400 mt-3">Phone</span>
            <input
              v-model="edittedItem.phoneNumber"
              class="w-full border px-3 py-1 rounded-xl"
              type="tel"
            />
            <span class="block text-sm text-slate-400 mt-3">Department</span>
            <input
              v-model="edittedItem.department"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
            />
            <span class="block text-sm text-slate-400 mt-3">Created At</span>
            <input
              v-model="edittedItem.createdAt"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3">Created By</span>
            <input
              v-model="edittedItem.createdBy"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              disabled
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <!-- <va-button> Custom action </va-button> -->
    </template>
  </va-modal>
  <ManagementBase>
    <template #header>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search Lecturer..."
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter> </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
        @click.prevent=""
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add Lecturer</span>
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
        <template #cell(email)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <!-- <template #cell(normalizedEmail)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template> -->

        <template #cell(phoneNumber)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <!-- <template #cell(twoFactorEnabled)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template> -->

        <template #cell(lockoutEnabled)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template>

        <template #cell(displayName)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(createdAt)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(actions)="{ rowData }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click="
                  () => {
                    toggleEditMode = false
                    handleEditClick(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
                @click="
                  () => {
                    toggleEditMode = true
                    handleEditClick(rowData)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-ban"
                color="text-red-400"
                @click="handleDeleteClick(rowData)"
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
  import BadgeBase from '@/components/admin/BadgeBase.vue'
  import type { LecturerModel } from './manageModel'
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  import { useModal, useToast } from 'vuestic-ui'

  const columns = ref([
    { key: 'email', label: 'Email' },
    { key: 'displayName', label: 'Display Name' },
    // { key: 'normalizedEmail', label: 'Normalized Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    // { key: 'twoFactorEnabled', label: 'Two Factor Enabled' },
    { key: 'createdAt', label: 'Create Date' },
    { key: 'lockoutEnabled', label: 'Status' },
    { key: 'actions', label: '' },
  ])

  const items = ref<LecturerModel[]>([])
  const selectedItem = ref<LecturerModel>()
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showEditModel = ref(false)
  const toggleEditMode = ref(false)

  const edittedItem = ref({
    email: 'jeffery@gmail.com',
    emailConfirmed: true,
    phoneNumber: '0909898888',
    lockoutEnd: '04-30-2022',
    lockoutEnabled: false,
    filePath:
      'https://img.freepik.com/premium-photo/young-caucasian-military-man-wearing-army-uniform-depressed-worry-distress_2221-10191.jpg',
    displayName: 'March Jeffery',
    department: null,
    departmentHead: null,
    createdBy: 'RaeKyo',
    createdAt: new Date(2022, 2, 30).toISOString().slice(0, 10),
  })

  onMounted(() => {
    fetchLecturers()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  async function fetchLecturers() {
    try {
      const response = await axios.get('/api/lecturers?page=1&quantity=20')
      const json = response.data
      items.value = (json as Array<LecturerModel>).map((item) => {
        item.createdAt = item.createdAt.toLocaleString().slice(0, 10)
        return item
      })

      console.log('API Lecturer:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditClick(rowData: LecturerModel) {
    selectedItem.value = rowData
    mapEdditedItem(selectedItem.value)

    // show modal
    showEditModel.value = !showEditModel.value
  }

  const { confirm } = useModal()
  const { init } = useToast()
  async function handleDeleteClick(rowData: LecturerModel) {
    selectedItem.value = rowData
    const result = await confirm({
      message: `Are you sure to delete this Lecturer ${rowData.email} - ${rowData.displayName}`,
      title: 'Lecturer delete confirmation',
      okText: 'Delete',
      cancelText: 'Cancel',
      blur: true,
    })

    if (result) {
      // user confirm delete
      const response = await axios.delete(
        `/api/lecturers?id=${selectedItem.value.id}`,
      )
      const responseData: DeleteLecturerResponseModel = response.data
      if (responseData.isSuccess) {
        // delete successful && load data
        fetchLecturers()

        // toast message
        init({
          title: 'Lecturer Delete Message',
          message: `Delete Lecturer: "${rowData.displayName}" successfully!`,
          color: '#fff',
        })
      } else {
        console.log(
          `Request to delete Failed with message: ${responseData.message}`,
        )
        console.log(`Error Detail: ${responseData.errors}`)
      }
    }
  }

  function mapEdditedItem(data: LecturerModel) {
    const item = edittedItem.value
    item.email = data.email as string
    item.displayName = data.displayName as string
    item.createdAt = data.createdAt.toLocaleString()
    item.createdBy = data.createdBy
    item.department = data.department as null
    item.departmentHead = data.departmentHead as null
    item.emailConfirmed = data.emailConfirmed
    item.lockoutEnabled = data.lockoutEnabled
    item.lockoutEnd = new Date(data.lockoutEnd as Date)
      .toISOString()
      .slice(0, 10)
    item.filePath = data.filePath as string
    item.phoneNumber = data.phoneNumber as string
  }

  interface DeleteLecturerResponseModel {
    isSuccess: boolean
    message: string
    errors: Array<string>
  }

  // interface UpdateLecturerRequestModel {
  //   displayName: string
  //   phoneNumber: string
  //   lockoutEnabled: boolean
  //   lockoutEnd: Date
  //   email: string
  //   departmentId: number
  //   subjectIds: Array<string>
  // }
</script>
