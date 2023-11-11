<template>
  <!-- {{ items }} -->
  <!-- {{ createItem }} -->
  <!-- {{ editItem }}
  {{ selectedItem }} -->
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
            v-model="isEditMode"
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
        class="w-[650px] h-[350px] relative flex items-center justify-center overflow-hidden border-b-2 border-slate-200"
      >
        <div class="h-full w-1/2 flex items-center justify-center">
          <div class="w-full h-full p-5">
            <div v-if="isEditMode">
              <!-- <va-file-upload
                v-model="edittedItem.Avatar"
                undo
                type="single"
                :on-file-added="uploadImgFireBase()"
                :undo-duration="5000"
                :undo-button-text="'Cancel'"
                :deleted-file-message="'File exterminated'"
              /> -->
              <input type="file" @change="uploadImgFireBase" />
            </div>
            <img
              v-else
              class="w-full h-[300px] object-cover rounded-xl shadow-sm shadow-slate-500"
              :src="selectedItem?.filePath"
              alt="user profile image"
            />
          </div>
        </div>
        <div class="h-full w-1/2 flex items-center justify-center pt-3">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400 mt-3">Display Name</span>
            <input
              v-model="editItem.displayName"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              :disabled="!isEditMode"
            />
            <span class="block text-sm text-slate-400">Phone Number</span>
            <input
              v-model="editItem.phoneNumber"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              :disabled="!isEditMode"
            />
            <span class="block text-sm text-slate-400 mt-3">Email</span>
            <input
              v-model="editItem.email"
              class="w-full border px-3 py-1 rounded-xl"
              type="text"
              :disabled="!isEditMode"
            />
            <!-- <span class="block text-sm text-slate-400 mt-3">Role</span>
            <va-select
              v-model="editItem.roleId"
              :options="roleOptions"
              class="w-full"
              text-by="name"
              value-by="id"
            /> -->
          </div>
        </div>
      </div>

      <!-- filed that blocked to edittion -->
      <div class="w-[650px] flex items-center justify-center flex-wrap">
        <div class="w-1/2 px-3 py-1">
          <span class="block text-sm text-slate-400 mt-3">Created At</span>
          <input
            :value="selectedItem?.createdAt"
            class="w-full border px-3 py-1 rounded-xl"
            type="text"
            disabled
          />
        </div>
        <div class="w-1/2 px-3 py-1">
          <span class="block text-sm text-slate-400 mt-3">Created By</span>
          <input
            :value="selectedItem?.createdBy"
            class="w-full border px-3 py-1 rounded-xl"
            type="text"
            disabled
          />
        </div>
        <div class="w-1/2 px-3 py-1">
          <span class="block text-sm text-slate-400 mt-3">Lockout Enabled</span>
          <input
            :value="selectedItem?.lockoutEnabled"
            class="w-full border px-3 py-1 rounded-xl"
            type="text"
            disabled
          />
        </div>
        <div class="w-1/2 px-3 py-1">
          <span class="block text-sm text-slate-400 mt-3">Lockout End</span>
          <input
            :value="selectedItem?.lockoutEnd"
            class="w-full border px-3 py-1 rounded-xl"
            type="text"
            disabled
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div v-if="isEditMode">
        <va-button
          color="#fcfcfc"
          text-color="#797f8a"
          @click="showEditModel = false"
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
      </div>
    </template>
  </va-modal>

  <va-modal
    v-model="showCreateModel"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <div
        class="h-12 flex items-center justify-between border-b-2 border-slate-400"
      >
        <h2 class="uppercase font-semibold">Create User</h2>
      </div>
    </template>
    <template #default>
      <div
        class="w-[650px] h-fit relative flex items-center justify-center overflow-hidden border-b-2 border-slate-200"
      >
        <div class="h-full w-1/2 flex items-center justify-center">
          <div class="w-full h-full p-5">
            <va-file-upload
              v-model="createItem.Avatar"
              undo
              type="single"
              :undo-duration="5000"
              :undo-button-text="'Cancel'"
              :deleted-file-message="'File exterminated'"
            />
          </div>
        </div>
        <div class="h-full w-1/2 flex items-center justify-center">
          <div class="w-full h-fit p-5">
            <span class="block text-sm text-slate-400">Username</span>
            <input
              v-model.trim="createItem.username"
              class="w-full border px-3 py-1 rounded-xl"
              type="email"
              :rules="[(v: any) => !!v || 'Email is required']"
              required
            />
            <span class="block text-sm text-slate-400 mt-3">Password</span>
            <input
              v-model.trim="createItem.password"
              class="w-full border px-3 py-1 rounded-xl"
              type="password"
              required
            />
            <span class="block text-sm text-slate-400 mt-3">Phone Number</span>
            <input
              v-model.trim="createItem.phoneNumber"
              class="w-full border px-3 py-1 rounded-xl"
              type="tel"
            />
            <span class="block text-sm text-slate-400 mt-3"
              >Lockout Enabled</span
            >
            <va-select
              v-model="createItem.lockoutEnabled"
              :options="statusOptions"
              class="w-full"
            />
            <span class="block text-sm text-slate-400 mt-3">Lockout End</span>
            <input
              v-model="createItem.lockoutEnd"
              class="w-full border px-3 py-1 rounded-xl"
              type="date"
            />
            <span class="block text-sm text-slate-400 mt-3">Email</span>
            <input
              v-model.trim="createItem.email"
              class="w-full border px-3 py-1 rounded-xl"
              type="email"
              :rules="[(v: any) => !!v || 'Email is required']"
            />
            <span class="block text-sm text-slate-400 mt-3">Role ID</span>
            <va-select
              v-model="createItem.roleId"
              :options="roleOptions"
              class="w-full"
              text-by="name"
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
        @click="showCreateModel = false"
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
        Select User
      </p>
      <input
        v-model="searchValue"
        type="text"
        placeholder="Ex: OmgSRT"
        class="border border-slate-300 px-3 py-1.5 rounded-xl w-full"
      />
    </template>
    <template #header_filter> </template>
    <template #header_add>
      <button
        class="border border-slate-300 w-[11.375rem] flex items-center justify-center text-sm text-white font-bold bg-[#2dce89] py-2 px-4 rounded-xl transition-all hover:scale-110 duration-300"
        @click.prevent="showCreateModel = !showCreateModel"
      >
        <i class="block fa-solid fa-plus"></i>
        <span class="block ml-2">Add User</span>
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

        <template #cell(lockoutEnabled)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template>

        <template #cell(twoFactorEnabled)="{ value }">
          <BadgeBase :status="value == 'true'" :text="value" />
        </template>

        <!-- <template #cell(displayName)="{ value }">
          <span class="text-sm">{{ value }}</span>
        </template> -->

        <template #cell(actions)="{ rowData }">
          <div class="w-[60px]">
            <div class="flex items-center justify-start">
              <ActionButtonBase
                icon="fa-solid fa-circle-info"
                color="text-blue-400"
                @click="
                  () => {
                    isEditMode = false
                    showEditModel = !showEditModel
                    selectedItem = rowData
                    mapEdditedItem(selectedItem as UserModel)
                  }
                "
              />
              <ActionButtonBase
                icon="fa-solid fa-pen"
                color="text-yellow-400"
                @click="
                  () => {
                    isEditMode = true
                    showEditModel = !showEditModel
                    selectedItem = rowData
                    mapEdditedItem(selectedItem as UserModel)
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
  import BadgeBase from '@/components/admin/BadgeBase.vue'
  import ActionButtonBase from '@/components/admin/ActionButtonBase.vue'
  import type { UserModel, RoleModel } from './manageModel'
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import { useToast, type VaFile, useModal } from 'vuestic-ui/web-components'

  const columns = ref([
    { key: 'email', label: 'Email' },
    { key: 'normalizedEmail', label: 'Normalized Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'twoFactorEnabled', label: 'Two Factor Enabled' },
    { key: 'lockoutEnabled', label: 'Ban' },
    { key: 'displayName', label: 'Display Name' },
    { key: 'actions', label: '' },
  ])

  const items = ref<UserModel[]>([])
  const searchValue = ref('')
  const perPage = ref(10)
  const currentPage = ref(1)
  const visualPage = ref(2)
  const roleOptions = ref<RoleModel[]>()
  const statusOptions = ref<Array<boolean>>([true, false])
  const showCreateModel = ref(false)
  const showEditModel = ref(false)
  const isEditMode = ref(false)
  const selectedItem = ref<UserModel>()

  import { ref as fref, uploadBytes } from 'firebase/storage'
  import { storage as fireStorage } from '@/firebase'
  import { getDownloadURL } from 'firebase/storage'

  const { confirm } = useModal()
  const { init } = useToast()

  function uploadImgFireBase(event: any) {
    const fileUpload = event.target.files[0]

    const storageRef = fref(fireStorage, `user_assets/${fileUpload?.name}`)
    uploadBytes(storageRef, fileUpload).then(async (snapshot) => {
      // console.log(snapshot)
      // alert(snapshot.ref.fullPath)
      // alert(await getDownloadURL(snapshot.ref))
      createItem.value.filePath = await getDownloadURL(snapshot.ref)
      editItem.value.filePath = await getDownloadURL(snapshot.ref)
    })
  }

  const createItem = ref<UserCreateRequestModel>({
    username: '',
    password: '',
    phoneNumber: '',
    lockoutEnabled: false,
    lockoutEnd: new Date().toISOString().slice(0, 10),
    email: '',
    roleId: '',
    Avatar: undefined,
  })
  const editItem = ref<UserEditRequestModel>({
    username: '',
    password: '',
    phoneNumber: '',
    lockoutEnabled: false,
    lockoutEnd: new Date().toISOString().slice(0, 10),
    email: '',
    roleId: '',
    Avatar: undefined,
  })

  onMounted(() => {
    fetchUsers()
    fetchRoles()
  })

  const pages = computed(() => {
    return perPage.value && perPage.value !== 0
      ? Math.ceil(items.value.length / perPage.value)
      : items.value.length
  })

  async function fetchRoles() {
    try {
      const response = await axios.get('/api/roles?page=1&quantity=99')
      const json = response.data
      roleOptions.value = json as Array<RoleModel>
      console.log(json)
    } catch (error) {
      console.log('Error: ')
      console.log(error)
    }
  }
  async function fetchUsers() {
    try {
      const response = await axios.get('/api/users?page=1&quantity=10')
      const json = response.data
      items.value = json as Array<UserModel>
      console.log('API User:')
      console.log(response)
    } catch (error) {
      console.log('Erorr: ')
      console.log(error)
    }
  }
  // async function fetchUserById(id: string) {
  //   try {
  //     const response = await axios.get(`/api/users/${id}`)
  //     const json = response.data
  //     selectedItem.value = json as UserModel
  //     mapEdditedItem(selectedItem.value)
  //     console.log('API User:')
  //     console.log(response)
  //   } catch (error) {
  //     console.log('Erorr: ')
  //     console.log(error)
  //   }
  // }

  async function handleCreateClick() {
    // const ResponseModel = ref<LecturerResponseModel>()
    try {
      await axios
        .post(`/api/users`, handleCreateContentForm(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const responseData = response.data as UserModel
          // TODO: response data have value of subjectModel as create successfull but not yet handle error occur during request || ErrorModel

          // close modal
          showCreateModel.value = false

          if (responseData) {
            // toast message
            init({
              title: 'Subject Create Message',
              message: `Create Lecturer: "${createItem.value.username}" successfully!`,
              color: '#2dd4bf',
            })

            // clear Input
            clearInputCreateModel()

            // delete successful && load data
            fetchUsers()
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
            title: 'Create User Failed!',
            message,
            color: '#f43f5e',
          })
          console.log(errorResponse)
        })
    } catch (error) {
      alert(error)
    }
  }
  async function handleUpdateClick() {
    // const ResponseModel = ref<LecturerResponseModel>()
    // fetchUserById(selectedItem.value?.id as string)
    showEditModel.value = false
    editItem.value.filePath = ''
    try {
      await axios
        .put(`/api/users/${selectedItem.value?.id}`, handleEditContentForm(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const responseData = response.data as UserModel

          // close modal
          showCreateModel.value = false

          if (responseData) {
            // toast message
            init({
              title: 'User Update Message',
              message: `Update User: "${editItem.value.email}" successfully!`,
              color: '#2dd4bf',
            })

            // clear Input
            clearInputCreateModel()

            // delete successful && load data
            fetchUsers()
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
            title: 'Update User Failed!',
            message,
            color: '#f43f5e',
          })
          console.log(errorResponse)
        })
    } catch (error) {
      alert(error)
    }
  }

  function handleCreateContentForm() {
    const formData = new FormData()
    formData.append('UserName', createItem.value.username)
    formData.append('Password', createItem.value.password)
    formData.append('PhoneNumber', createItem.value.phoneNumber as string)
    formData.append('Email', createItem.value.email as string)
    formData.append(
      'LockoutEnabled',
      Boolean(createItem.value.lockoutEnabled).toString(),
    )
    // formData.append(
    //   'LockoutEnd',
    //   new Date(createItem.value.lockoutEnd).toISOString(),
    // )

    formData.append('RoleId', createItem.value.roleId as string)
    formData.append('Avatar', createItem.value.Avatar as File)
    return formData
  }
  function handleEditContentForm() {
    const formData = new FormData()
    const item = editItem.value
    const selected = selectedItem.value

    // formData.append('UserName', editItem.value.username)
    // formData.append('Password', editItem.value.password)
    if (item.displayName != selected?.displayName) {
      formData.append('DisplayName', editItem.value.displayName as string)
    }
    if (item.phoneNumber != selected?.phoneNumber) {
      formData.append('PhoneNumber', editItem.value.phoneNumber as string)
    }
    if (item.email != selected?.email) {
      formData.append('Email', editItem.value.email as string)
    }
    if (item.lockoutEnabled != selected?.lockoutEnabled) {
      formData.append(
        'LockoutEnabled',
        Boolean(editItem.value.lockoutEnabled).toString(),
      )
    }
    // formData.append(
    //   'LockoutEnd',
    //   new Date(createItem.value.lockoutEnd).toISOString(),
    // )

    if (item.roleId != selected?.roleId) {
      formData.append('RoleId', editItem.value.roleId as string)
    }
    // formData.append('Avatar', editItem.value.Avatar as File)
    return formData
  }
  async function handleDeleteClick(rowData: UserModel) {
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
      await axios
        .delete(`/api/users?id=${selectedItem.value.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => {
          // delete successful && load data
          fetchUsers()

          // toast message
          init({
            title: 'User Delete Message',
            message: `Delete User: "${rowData.email}" successfully!`,
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
            title: 'Delete User Failed!',
            message,
            color: '#f43f5e',
          })
          console.log(errorResponse)
        })
    }
  }

  function mapEdditedItem(data: UserModel) {
    const item = editItem.value
    item.username = data.username as string
    item.password = data.password as string
    item.phoneNumber = data.phoneNumber as string
    item.displayName = data.displayName as string
    item.roleId = data.roleId as string
    item.email = data.email as string
    item.lockoutEnabled = data.lockoutEnabled
    item.lockoutEnd = new Date().toISOString().slice(0, 10)
    // item.Avatar = data.filePath as string
    item.phoneNumber = data.phoneNumber as string
  }

  function clearInputCreateModel() {
    const item = createItem.value
    item.username = ''
    item.password = ''
    item.phoneNumber = ''
    item.lockoutEnabled = false
    item.lockoutEnd = new Date().toISOString().slice(0, 10)
    item.email = ''
    item.roleId = ''
    item.Avatar = undefined
  }

  interface ErrorResponseModel {
    [key: string]: any

    isSuccess: boolean
    message: string
    errors: { [key: string]: any }
  }

  interface UserCreateRequestModel {
    [key: string]: any

    username: string
    password: string
    phoneNumber?: string
    lockoutEnabled?: boolean
    lockoutEnd?: Date | string
    email?: string
    roleId?: string
    Avatar?: VaFile
  }
  interface UserEditRequestModel {
    [key: string]: any

    username: string
    password: string
    phoneNumber?: string
    lockoutEnabled?: boolean
    lockoutEnd?: Date | string
    email?: string
    roleId?: string
    Avatar?: VaFile
  }
</script>
