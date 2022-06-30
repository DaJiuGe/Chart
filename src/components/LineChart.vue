<template>
  <div class="wrapper">
    <Chart :options="options" class="chart" />
  </div>
</template>

<script setup lang="ts">
import Chart from './BaseChart.vue'
import { array, oneOf } from 'vue-types'

type ChartItem = { xAxis: string; value: number }

const props = defineProps({
  data: array<ChartItem>().def([]),
  valueType: oneOf(['number', 'ratio', 'money']).def('number')
})

const options = ref({})

const render = (data: ChartItem[]) => {
  const xAxisData = data.map(el => el.xAxis)
  const valueData = data.map(el => el.value)
  options.value = {
    grid: {
      width: '100%',
      left: '0%',
      right: '0%',
      top: '16',
      bottom: '16',
      containLabel: true
    },
    legend: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter
    },
    xAxis: {
      type: 'category',
      offset: 1,
      axisTick: {
        alignWithLabel: true
      },
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: valueFormatter
      }
    },
    series: [
      {
        name: 'value',
        type: 'line',
        barWidth: '60%',
        data: valueData
      }
    ]
  }
}

const transformRatio = (value: number) => `${value.toFixed(2) * 100}%`
const transformNumber = (value: number) => value.toLocaleString()
const transformMoney = (value: number) => `$${transformNumber(value)}`
const valueFormatter = (value: number) => {
  switch (props.valueType) {
    case 'ratio':
      return transformRatio(value)
    case 'number':
      return transformNumber(value)
    case 'money':
      return transformMoney(value)
    default:
      return value.toString()
  }
}

const tooltipFormatter = (params: ChartItem[]) => {
  const { xAxis, value } = params[0]
  return `<div>${xAxis}&nbsp;&nbsp;&nbsp;&nbsp;${valueFormatter(value)}</div>`
}

watch(
  () => props.data,
  newData => {
    render(newData)
  },
  { immediate: true }
)
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.wrapper .chart {
  width: 100%;
  height: 100%;
}
</style>
