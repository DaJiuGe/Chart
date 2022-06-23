<template>
  <div class="wrapper">
    <Chart :options="options" class="chart" />
  </div>
</template>

<script setup lang="ts">
import Chart from './BaseChart.vue'
import { array, oneOf, string } from 'vue-types'

type BarChartItem = { name: string; value: number }
type CountryMap = { label: string; value: string }

const props = defineProps({
  data: array<BarChartItem>().def([]),
  valueType: oneOf(['number', 'ratio', 'money']).def('number'),
  color: string().def('#5272c3'),
  tooltipHeader: string().def(''),
  tooltipSubHeader: string().def(''),
  xAxisMap: array<CountryMap>().def([])
})

const options = ref({})

const render = (data: BarChartItem[]) => {
  const xAxisData = data.map(el => el.name)
  const valueData = data.map(el => el.value)
  options.value = {
    legend: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: tooltipFormatter
    },
    dataZoom: {
      zoomLock: true, // 禁止缩放
      filterMode: 'none', // 不出现在视野的轴不会改变 y 轴，
      brushSelect: false, // slider 禁止重新选择范围
      height: 10,
      brushStyle: {
        opacity: 0
      },
      maxValueSpan: 5 // 最多显示 n + 1 的柱子
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
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: props.color
        },
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
  const { name, value } = params[0]
  const tooltipHeader = `<div class="tooltip header">
                          ${props.tooltipHeader}
                        </div>`
  const tooltipSubHeader = `<div class="tooltip sub-header">
                              ${props.tooltipSubHeader}
                            </div>`
  return `<div style="{width: 120px}">
            ${tooltipHeader}
            ${tooltipSubHeader}
            <div class="value-wrapper">
              <span class="label">${name}</span>
              <span>${valueFormatter(value)}</span>
            </div>
          </div>`
}

const transformXAxis = (data: ChartItem[]) => {
  if (props.xAxisMap.length === 0) {
    return data
  }

  const map = new Map()
  props.xAxisMap.forEach(el => {
    map.set(el.label, el.value)
  })
  return data.map(el => ({
    name: map.get(el.name) ?? el.name,
    value: el.value
  }))
}

watch(
  () => props.data,
  newData => {
    render(transformXAxis(newData))
  },
  { immediate: true }
)
</script>

<style>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.wrapper .chart {
  width: 50%;
  height: 70%;
}

.tooltip {
  text-align: left;
}

.tooltip.header {
  font-size: 10px;
  color: '#eeeeee';
}

.tooltip.sub-header {
  font-size: 12px;
  color: '#dddddd';
  margin-bottom: 4px;
}

.value-wrapper {
  display: flex;
  justify-content: space-between;
}

.label {
  text-align: left;
}
</style>
