<template>
  <va-modal
    ref="modal"
    v-model="showModal"
    ok-text="Apply"
    stateful
    close-button
  >
    <h3 class="text-xl font-bold">Lecturer Detail Information</h3>
    <div class="mt-5 flex items-center justify-between">
      <img
        src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        alt=""
        class="w-[250px] h-[300px] object-cover"
      />
      <div>
        <table class="">
          <tr v-for="(prop, idx) in itemSelected" :key="idx">
            <td>{{}}</td>
            <td>{{ prop }}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- {{ itemSelectedId }}
    {{ itemSelected }} -->
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
        :style="{ '--va-data-table-thead-color': '#8392ab' }"
      >
        <template #cell(name)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(email)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(phone)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(department)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(subject)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template>

        <template #cell(status)="{ value }">
          <BadgeBase :status="value == 'online'" :text="value" />
        </template>

        <template #cell(actions)="{ rowIndex }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click="openModalToEditItemById(rowIndex)"
              />
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
              />
              <ActionButtonBase icon="fa-solid fa-ban" color="text-red-400" />
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
  import ManagementBase from '@/component/admin/ManagementBase.vue'
  import BadgeBase from '@/component/admin/BadgeBase.vue'
  import ActionButtonBase from '@/component/admin/ActionButtonBase.vue'
  import type { LecturerModel } from './manageModel'
  import lecturerList from './sampleData/lecturerList'
  import { ref, computed } from 'vue'

  const columns = ref([
    { key: 'name' },
    { key: 'email' },
    { key: 'phone' },
    { key: 'department' },
    { key: 'subject' },
    { key: 'status' },
    { key: 'actions', label: '' },
  ])

  const items = ref<LecturerModel[]>(lecturerList)
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const showModal = ref(false)
  const itemSelectedId = ref(null)
  const itemSelected = ref<LecturerModel>()

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  function openModalToEditItemById(id: any) {
    itemSelectedId.value = id
    itemSelected.value = { ...items.value[id] }
    //show model.value based on id
    showModal.value = !showModal.value
  }
</script>
