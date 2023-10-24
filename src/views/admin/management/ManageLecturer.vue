<template>
  <va-modal
    v-model="showDetailModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h3>Custom header</h3>
    </template>
    <template #footer>
      <va-button> Custom action </va-button>
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

        <template #cell(normalizedEmail)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(phoneNumber)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(twoFactorEnabled)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template>

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
                @click.prevent="showDetailModal != showDetailModal"
              />
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
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
  import BadgeBase from '@/components/admin/BadgeBase.vue'
  import ActionButtonBase from '@/components/admin/ActionButtonBase.vue'
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
    { key: 'lockoutEnabled', label: 'Status' },
    { key: 'createdAt', label: 'Create Date' },
    { key: 'actions', label: '' },
  ])

  const items = ref<LecturerModel[]>([])
  const selectedItem = ref<LecturerModel>()
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showDetailModal = ref(false)

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
      items.value = json as Array<LecturerModel>
      console.log('API Lecturer:')
      console.log(json)
    } catch (error) {
      console.log(error)
    }
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
        `/api/lecturer/${selectedItem.value.id}`,
      )
      const responseData: DeleteLecturerResponseModel = response.data
      if (responseData.isSuccess) {
        // delete successful && load fetching
        fetchLecturers()

        // toast message
        init({
          title: 'Lecturer Delete Message',
          message: `Delete Lecturer: "${rowData.displayName} successfully!`,
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

  interface DeleteLecturerResponseModel {
    isSuccess: boolean
    message: string
    errors: Array<string>
  }
</script>
