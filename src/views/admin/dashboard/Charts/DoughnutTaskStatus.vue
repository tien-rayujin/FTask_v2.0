<template>
  <div>
    <Doughnut v-if="loaded" :data="chartData" :options="chartOption" />
  </div>
</template>

<script setup lang="ts">
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, Legend, Tooltip, Title } from 'chart.js'
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  ChartJS.register(Title, Tooltip, Legend)

  const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  }

  const chartData: ChartData = {
    labels: ['Todo', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Rate',
        backgroundColor: Object.values(CHART_COLORS),
        data: [40, 20, 12],
      },
    ],
  }

  const chartOption = {
    type: Object,
    responsive: true,
  }

  onMounted(() => {
    fetchData()
  })

  const from = '2023-01-01'
  const end = '2023-10-27'
  const loaded = ref(false)

  async function fetchData() {
    try {
      const response = await axios.get(
        `/api/statistics/task-status?from=${from}&to=${end}`,
      )
      const res = (await response.data) as TaskStatusResponseModel

      const data = [res.toDo.percent, res.inProgress.percent, res.end.percent]

      chartData.datasets[0].data = data
      loaded.value = true
    } catch (reason) {
      console.log(reason)
    }
  }

  interface ChartData {
    labels: string[]
    datasets: Dataset[]
  }

  interface Dataset {
    label: string
    backgroundColor: string[]
    data: number[]
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
