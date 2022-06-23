<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from 'vue'
import * as echarts from 'echarts'

const container = ref(null)
const chart = ref(null)
// @ts-ignore
const unwrap = obj => obj && (obj.__v_raw || obj.valueOf() || obj)

const props = defineProps({
  options: {
    type: Object,
    default: {},
    required: true
  }
})

const { options } = toRefs(props)
watch(
  options,
  newOptions => {
    unwrap(chart.value).setOption(newOptions)
  },
  { deep: true }
)

onMounted(() => {
  chart.value = echarts.init(container.value)
  unwrap(chart.value).setOption(options.value)
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
