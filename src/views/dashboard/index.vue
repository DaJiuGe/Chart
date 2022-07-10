<template>
  <div class="stat-wrapper">
    <!-- <StatCard :tabList="tabList"></StatCard>
    <StatCard :tabList="tabList"></StatCard> -->
    <!-- <DynamicLineChart :data="data" /> -->
    <MenuTab
      :tab-keys="[StatEnum.Rating, StatEnum.RatingOverall]"
      :more-tab-keys="[StatEnum.RatingOverallCnt, StatEnum.ReviewOverallCnt]"
    />
  </div>
</template>

<script setup lang="ts">
import { StatEnum, StatLabel } from '../../modules/stat'
import StatCard from './components/StatCard.vue'
import MenuTab from './components/MenuTab.vue'

const tabList = [
  {
    key: StatEnum.Rating,
    tab: StatLabel[StatEnum.Rating]
  },
  {
    key: StatEnum.RatingOverall,
    tab: StatLabel[StatEnum.RatingOverall]
  }
]

const data = [
  { xAxis: 'A', name: 'Line1', value: 1 },
  { xAxis: 'B', name: 'Line1', value: 2 },
  { xAxis: 'C', name: 'Line1', value: 3 },
  { xAxis: 'D', name: 'Line1', value: 3 },
  { xAxis: 'E', name: 'Line1', value: 3 },
  { xAxis: 'F', name: 'Line1', value: 3 }
  // { xAxis: 'A', name: 'Line2', value: 1 },
  // { xAxis: 'B', name: 'Line2', value: 2 },
  // { xAxis: 'C', name: 'Line2', value: 3 },
  // { xAxis: 'D', name: 'Line2', value: 3 },
  // { xAxis: 'E', name: 'Line2', value: 3 },
  // { xAxis: 'F', name: 'Line2', value: 3 }
]
</script>

<style scoped>
.stat-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  height: 80vh;
}
</style>
