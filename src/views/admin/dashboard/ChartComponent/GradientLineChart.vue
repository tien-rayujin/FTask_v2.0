<template>
  <div class="w-full h-full">
    <Bar
      v-if="loaded"
      :key="JSON.stringify(props.semesterId)"
      class="w-full h-full"
      :data="chartData"
      :options="chartOption"
    />
  </div>
</template>

<script setup lang="ts">
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Legend,
    Tooltip,
    Title,
    ArcElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
  } from 'chart.js'
  import { onMounted, ref, watch } from 'vue'
  import axios from 'axios'

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
  )

  // const CHART_COLORS = {
  //   red: 'rgb(255, 99, 132)',
  //   orange: 'rgb(255, 159, 64)',
  //   yellow: 'rgb(255, 205, 86)',
  //   green: 'rgb(75, 192, 192)',
  //   blue: 'rgb(54, 162, 235)',
  //   purple: 'rgb(153, 102, 255)',
  //   grey: 'rgb(201, 203, 207)',
  // }

  const chartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Completion Rate',
        backgroundColor: ['#2dce89'],
        // backgroundColor: ['#2dce89', '#8e5ea2'],
        borderColor: ['#2dce89'],
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 20,
        data: [],
        tension: 0.3,
      },
    ],
  }

  const chartOption = {
    type: Object,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Task Completion Rate',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            callback: function (value: any) {
              return value + '%'
            },
            display: true,
            padding: 10,
            color: 'black',
            font: {
              size: 12,
              family: 'Open Sans',
              style: 'normal',
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: 'black',
            padding: 20,
            font: {
              size: 12,
              family: 'Open Sans',
              style: 'normal',
              lineHeight: 2,
            },
          },
        },
      },
    },
  }

  const props = defineProps({
    from: {
      type: String,
      required: true,
      default: '',
    },
    to: {
      type: String,
      required: true,
      default: '',
    },
    semesterId: {
      type: String,
      required: true,
      default: '2',
    },
  })

  watch(props, () => {
    loaded.value = false

    fetchData()
  })

  onMounted(() => {
    fetchData()
  })

  const loaded = ref(false)

  async function fetchData() {
    try {
      const response = await axios.get(
        `/api/statistics/task-completion-rate?from=${props.from}&to=${props.to}&semesterId=${props.semesterId}`,
      )
      const res = await response.data

      const data: number[] = []
      const labels: string[] = []

      res.forEach((e: any) => {
        data.push(e.completionRate)
        labels.push(`${e.task.taskId}`)
      })

      // console.log('res')
      // console.log(res)
      // console.log('data')
      // console.log(data)
      // console.log('labels')
      // console.log(labels)

      chartData.datasets[0].data = data
      chartData.labels = labels

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
    borderColor: string[]
    pointRadius: number
    pointHoverRadius: number
    pointHitRadius: number
    data: number[]
    tension: number
  }
</script>
