<template>
  <ManagementBase>
    <template #header>
      <input
        type="text"
        placeholder="Search Lecturer"
        class="border border-slate-300 pl-5 pr-5 py-2 rounded-xl w-full"
      />
    </template>
    <template #header_filter>
      <DropdownBase />
    </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[9.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add User</span>
      </button>
    </template>
    <template #main>
      <TableBase :columns="columns" :items="items">
        <template #cell-Lecturer="{ item }">
          <div class="flex px-2 py-1">
            <div class="pr-4">
              <img
                class="w-[36px] h-[36px] rounded-lg"
                :src="item.lecturer.img"
                alt=""
              />
            </div>
            <div class="flex justify-center flex-col">
              <h6 class="text-sm font-semibold">{{ item.lecturer.name }}</h6>
              <p class="text-xs text-[#8392ab]">{{ item.lecturer.email }}</p>
            </div>
          </div>
        </template>
        <template #cell-Phone="{ item }">
          <h6 class="text-sm">{{ item.phone }}</h6>
        </template>
        <template #cell-Department="{ item }">
          <!-- {{ item.function }} -->
          <h6 class="text-sm">{{ item.department }}</h6>
        </template>
        <template #cell-Subject="{ item }">
          <!-- {{ item.function }} -->
          <h6 class="text-sm">{{ item.subject }}</h6>
        </template>
        <template #cell-Status="{ item }">
          <!-- {{ item.status }} -->
          <div>
            <BadgeBase :status="item.status == 'online'" :text="item.status" />
          </div>
        </template>
        <template #cell-Actions="{}">
          <!-- <button class="text-xs text-[#8392ab]">View</button> -->
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="blue-400"
              />
              <ActionButtonBase icon="fa-solid fa-pen" color="yellow-400" />
              <ActionButtonBase icon="fa-solid fa-ban" color="red-400" />
            </div>
          </div>
        </template>
      </TableBase>
    </template>
    <template #footer>
      <PagingBase />
    </template>
  </ManagementBase>
</template>

<script setup lang="ts">
  import ManagementBase from '@/component/admin/ManagementBase.vue'
  import TableBase from '@/component/admin/TableBase.vue'
  import DropdownBase from '@/component/admin/DropdownBase.vue'
  import BadgeBase from '@/component/admin/BadgeBase.vue'
  import PagingBase from '@/component/admin/PagingBase.vue'
  import ActionButtonBase from '@/component/admin/ActionButtonBase.vue'
  import { ref } from 'vue'

  const columns = ref([
    { key: 'Lecturer' },
    { key: 'Phone' },
    { key: 'Department' },
    { key: 'Subject' },
    { key: 'Status' },
    { key: 'Actions', label: '' },
  ])

  const items = ref<ItemModel[]>([])

  const lecturer1: ItemModel = {
    lecturer: {
      img: 'http://localhost:8080/img/team-2.de26a134.jpg',
      name: 'RaeKyuoo',
      email: 'raekyo@gmail.com',
    },
    phone: '090878688',
    department: 'Computer Science',
    subject: 'Basic Operating System',
    status: 'online',
  }

  const lecturer2: ItemModel = { ...lecturer1, status: 'offline' }

  items.value = [
    lecturer1,
    lecturer2,
    lecturer1,
    lecturer2,
    lecturer2,
    lecturer1,
    lecturer2,
    lecturer2,
    lecturer1,
  ]

  export interface ColumnModel {
    key: keyof ItemModel
    label?: string
  }

  export interface ItemModel {
    [key: string]: any
    lecturer: LecturerModel
    phone: string
    department: string
    subject: string
    status: string
  }

  export interface LecturerModel {
    img: string
    name: string
    email: string
  }
</script>
