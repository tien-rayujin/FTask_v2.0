<template>
  <div class="grid grid-cols-12 gap-7">
    <div class="col-span-12">
      <TaskStatusStatistic
        :from="state.from"
        :to="state.to"
        :semester-id="state?.semesterId"
      />
    </div>

    <div class="col-span-8">
      <div class="grid grid-cols-12 gap-7">
        <div class="col-span-12 bg-white rounded-xl p-5">
          <!-- <GradientLineChart /> -->
        </div>
      </div>
    </div>

    <div class="col-span-4">
      <div
        class="bg-white w-full h-full rounded-xl flex items-center justify-center"
      >
        <DoughnutTaskStatus
          :from="state.from"
          :to="state.to"
          :semester-id="state?.semesterId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TaskStatusStatistic from './ChartComponent/TaskStatusStatistic.vue'
  // import GradientLineChart from './ChartComponent/GradientLineChart.vue'
  import DoughnutTaskStatus from './ChartComponent/DoughnutTaskStatus.vue'
  import { useStatisticStore } from '@/stores/statistic-store'
  import { ref, watch } from 'vue'

  const statisticStore = useStatisticStore()
  const state = ref(statisticStore.getState)

  watch(statisticStore.getState, () => {
    state.value = statisticStore.getState
  })
</script>
