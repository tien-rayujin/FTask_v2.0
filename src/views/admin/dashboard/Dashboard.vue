<template>
  <div class="grid grid-cols-12 gap-7">
    <div class="col-span-12">
      <TaskStatusStatistic />
    </div>

    <div class="col-span-9">
      <div class="grid grid-cols-12 gap-7">
        <div class="col-span-12 bg-white rounded-xl p-5">
          <GradientLineChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TaskStatusStatistic from './Charts/TaskStatusStatistic.vue'
  import GradientLineChart from './Charts/GradientLineChart.vue'
</script>
