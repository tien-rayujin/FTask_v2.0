<template>
  <div class="grid grid-cols-12 gap-7">
    <div class="col-span-3 p-3 bg-white rounded-xl mb-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-600 font-bold uppercase">Todo</p>
          <h5 class="font-black text-2xl">{{ data.toDo.quantity }}</h5>
          <span class="text-sm text-blue-600 pt-3 font-semibold block"
            >{{ data.toDo?.percent }}%</span
          >
        </div>
        <div
          class="bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full flex items-center justify-center w-14 h-14"
        >
          <i class="fa-solid fa-clipboard-list text-xl text-white"></i>
        </div>
      </div>
    </div>
    <div class="col-span-3 p-3 bg-white rounded-xl mb-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-600 font-bold uppercase">In Progress</p>
          <h5 class="font-black text-2xl">{{ data.inProgress?.quantity }}</h5>
          <span class="text-sm text-yellow-600 pt-3 font-semibold block"
            >{{ data.inProgress?.percent }}%</span
          >
        </div>
        <div
          class="bg-gradient-to-tr from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center w-14 h-14"
        >
          <i class="fa-solid fa-hourglass text-xl text-white"></i>
        </div>
      </div>
    </div>
    <div class="col-span-3 p-3 bg-white rounded-xl mb-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-600 font-bold uppercase">Complete</p>
          <h5 class="font-black text-2xl">{{ data.end?.quantity }}</h5>
          <span class="text-sm text-green-600 pt-3 font-semibold block"
            >{{ data.end?.percent }}%</span
          >
        </div>
        <div
          class="bg-gradient-to-tr from-green-300 to-green-400 rounded-full flex items-center justify-center w-14 h-14"
        >
          <i class="fa-solid fa-check text-xl text-white"></i>
        </div>
      </div>
    </div>
    <div class="col-span-3 p-3 bg-white rounded-xl mb-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-600 font-bold uppercase">
            Total Participant
          </p>
          <h5 class="font-black text-2xl">{{ data.totalParticipant }}</h5>
          <span class="text-sm text-green-600 pt-3 font-semibold block"
            >From {{ from }} To {{ end }}</span
          >
        </div>
        <div
          class="bg-gradient-to-tr from-[#fb6340] to-[#fbb140] rounded-full flex items-center justify-center w-14 h-14"
        >
          <i class="fa-solid fa-user text-xl text-white"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted } from 'vue'

  const data = ref<TaskStatusResponseModel>({
    toDo: {
      quantity: 0,
      percent: 0,
    },

    inProgress: {
      quantity: 0,
      percent: 0,
    },

    end: {
      quantity: 0,
      percent: 0,
    },

    totalParticipant: 0,
  })

  const from = '2023-01-01'
  const end = '2023-10-27'

  onMounted(() => {
    fetchTaskStatistic()
  })

  async function fetchTaskStatistic() {
    try {
      const response = await axios.get(`/api/statistics/task-status`)
      const res = (await response.data) as TaskStatusResponseModel

      data.value = res
    } catch (reason) {
      console.log(reason)
    }
  }

  interface TaskStatusResponseModel {
    toDo: {
      quantity: number
      percent: number
    }

    inProgress: {
      quantity: number
      percent: number
    }

    end: {
      quantity: number
      percent: number
    }

    totalParticipant: number
  }
</script>
