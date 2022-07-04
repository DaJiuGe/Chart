<template>
  <div class="wrapper">
    <div class="filter-wrapper">
      <a-dropdown v-if="filters.length > 1" :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <span class="filter-label">显示器筛选</span>
          <FilterOutlined />
        </a>
        <template #overlay>
          <a-menu @click="handleFilterClick">
            <a-menu-item v-if="filters.length > 0" :key="0" @click.prevent>
              <a-checkbox v-model:checked="filters[0].checked">
                {{ filters[0].name }}
              </a-checkbox>
            </a-menu-item>
            <a-menu-divider v-if="filters.length > 1" />
            <a-menu-item
              v-for="(item, index) in filters"
              :key="index"
              @click.prevent
            >
              <a-checkbox v-if="index > 0" v-model:checked="item.checked">
                {{ item.name }}
              </a-checkbox>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="chart-wrapper">
      <Chart :options="options" class="chart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from './BaseChart.vue'
import { array, oneOf } from 'vue-types'
import { FilterOutlined } from '@ant-design/icons-vue'

type ChartItem = { xAxis: string; name: string; value: number }
type FilterItem = { name: string; checked: boolean }

const props = defineProps({
  data: array<ChartItem>().def([]),
  valueType: oneOf(['number', 'ratio', 'money']).def('number')
})

const options = ref({})

const filters = ref<FilterItem[]>([])

const filterLegend = () => {
  const filter = {
    legend: {
      show: false,
      selected: Object.assign(
        {},
        ...filters.value.map(el => ({
          [el.name]: el.checked
        }))
      )
    }
  }

  options.value = { ...options.value, ...filter }
}

const handleFilterClick = (e: { key: number }) => {
  const index = e.key
  filters.value[index].checked = !filters.value[index].checked

  filterLegend()
}

const render = (data: ChartItem[]) => {
  const xAxisData = Array.from(new Set(data.map(el => el.xAxis)))
  const seriesNames = Array.from(new Set(data.map(el => el.name)))

  const series: any[] = []
  seriesNames.map(name => {
    const filterData = data.filter(el => el.name === name)
    series.push({
      name,
      type: 'line',
      data: filterData.map(el => el.value)
    })
  })

  filters.value = seriesNames.map(el => ({
    name: el,
    checked: true
  }))

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
    series
  }
}

const transformRatio = (value: number) => `${(value * 100).toFixed(2)}%`
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

type SeriesItem = { seriesName: string; value: number; color: string }
const tooltipFormatter = (params: SeriesItem[]) => {
  return params
    .map(el => {
      const { seriesName, value, color } = el
      return `<div class="tooltip-wrapper">
                <div><i style="background: ${color}" class="color-sign"></i>${seriesName}</div>
                <div>${valueFormatter(value)}</div>
              </div>`
    })
    .join('')
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
}

.chart-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.chart-wrapper .chart {
  width: 100%;
  height: 100%;
}

.filter-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.filter-label {
  color: black;
  margin-right: 4px;
}

:deep(.tooltip-wrapper) {
  display: flex;
  justify-content: space-between;
  gap: 64px;
  margin: 4px;
}

:deep(.color-sign) {
  display: inline-block;
  width: 8px;
  height: 8px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
