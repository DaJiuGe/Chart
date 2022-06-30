<script setup lang="ts">
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import Dashboard from './views/dashboard/index.vue'

const barData = [
  { name: 'A', value: 1 },
  { name: 'B', value: 2 },
  { name: 'C', value: 3 },
  { name: 'D', value: 3 },
  { name: 'E', value: 3 },
  { name: 'F', value: 3 },
  { name: 'G', value: 3 },
  { name: 'H', value: 3 },
  { name: 'I', value: 3 },
  { name: 'J', value: 100 }
]

const xAxisMap = [{ label: 'A', value: '中国' }]

const lineData = [
  { name: 'A', value: 1 },
  { name: 'B', value: 2 },
  { name: 'C', value: 3 },
  { name: 'D', value: 3 },
  { name: 'E', value: 3 },
  { name: 'F', value: 3 },
  { name: 'G', value: 3 },
  { name: 'H', value: 3 },
  { name: 'I', value: 3 },
  { name: 'J', value: 10000.3333 }
]

const ratioData = [
  { name: 'A', value: 0.1 },
  { name: 'B', value: 0.2 },
  { name: 'C', value: 0.3 },
  { name: 'D', value: 0.3 },
  { name: 'E', value: 0.3 },
  { name: 'F', value: 0.3 },
  { name: 'G', value: 0.3 },
  { name: 'H', value: 0.3 },
  { name: 'I', value: 0.3 }
]
</script>

<template>
  <!-- <BarChart
    :data="barData"
    :x-axis-map="xAxisMap"
    tooltip-header="2022.06.24 - 2022.06.25"
    tooltip-sub-header="评分新增数"
  /> -->
  <!-- <LineChart :data="ratioData" value-type="money" /> -->
  <Dashboard />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
