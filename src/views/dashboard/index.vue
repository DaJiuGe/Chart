<template>
  <div class="stat-wrapper">
    <StatCard :tabList="tabList"></StatCard>
    <StatCard :tabList="tabList"></StatCard>
  </div>
</template>

<script setup lang="ts">
import { StatEnum, StatLabel } from '../../modules/stat'
import StatCard from './components/StatCard.vue'

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
</script>

<style scoped>
.stat-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}
</style>
