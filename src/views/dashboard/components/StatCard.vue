<template>
  <div class="wrapper">
    <a-card
      style="width: 100%"
      :tab-list="tabList"
      @tabChange="handleTabChange"
    >
      <template #tabBarExtraContent>
        <a-tooltip :title="tooltip">
          <QuestionCircleOutlined />
        </a-tooltip>
        <a-button
          @click="
            () => {
              loading = !loading
            }
          "
          >Toggle</a-button
        >
      </template>
      <div v-if="loading" class="content spin-placeholder">
        <a-spin size="large" />
      </div>
      <div v-else class="content">
        <div class="content__chart-wrapper">
          <LineChart :data="data" />
        </div>
        <div class="content__rank-wrapper">
          <div class="rank">
            <a-list item-layout="horizontal" :data-source="list">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  >
                    <template #title>
                      <a href="https://www.antdv.com/">{{ item.title }}</a>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
          <div class="rank">
            <a-list item-layout="horizontal" :data-source="list">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  >
                    <template #title>
                      <a href="https://www.antdv.com/">{{ item.title }}</a>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { array } from 'vue-types'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { StatEnum, StatTooltip } from '../../../modules/stat'

type LineChartItem = { xAxis: string; value: number }
type Tab = { key: StatEnum; tab: string }

const props = defineProps({
  tabList: array<Tab>().def([])
})

const loading = ref(false)
const activeKey = ref<StatEnum | ''>('')
const tooltip = ref<string>('')

const data = ref<LineChartItem[]>([])

interface DataItem {
  title: string
}
const list: DataItem[] = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  }
]

onMounted(() => {
  activeKey.value = props.tabList[0].key ?? ''

  data.value = [
    { xAxis: 'A', value: 1 },
    { xAxis: 'B', value: 2 },
    { xAxis: 'C', value: 3 },
    { xAxis: 'D', value: 3 },
    { xAxis: 'E', value: 3 },
    { xAxis: 'F', value: 3 }
  ]
})

const handleTabChange = (key: StatEnum) => {
  data.value = []

  loading.value = true

  setTimeout(() => {
    loading.value = false
    data.value = [
      { xAxis: 'A', value: 1 },
      { xAxis: 'B', value: 2 },
      { xAxis: 'C', value: 3 },
      { xAxis: 'D', value: 3 },
      { xAxis: 'E', value: 3 },
      { xAxis: 'F', value: 3 }
    ]
  }, 3000)
  // 更新图表和排名
  tooltip.value = StatTooltip[key]
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.content {
  height: 588px;
}

.spin-placeholder {
  display: grid;
  place-items: center;
}

.content__chart-wrapper {
  display: grid;
  place-items: center;
  height: 240px;
}

.content__rank-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 54px;
  margin-top: 16px;
  height: 284px;
}

.rank {
  flex: 1;
}
</style>
