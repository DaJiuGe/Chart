<template>
  <a-card
    style="width: 100%"
    :tab-list="tabs"
    :active-tab-key="activeTabKey"
    @tabChange="handleChangeTab"
  >
    <p>project content</p>
    <template #customTab="item">
      <a-dropdown
        v-if="item.key === 'more'"
        :trigger="['click']"
        v-model:visible="menuVisible"
      >
        <span>
          {{ dropdownLabel }}
          <DownOutlined />
        </span>
        <template #overlay>
          <a-menu @click="handleClickMenu">
            <a-menu-item v-for="item in menus" :key="item.value">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown></template
    >
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { array } from 'vue-types'
import { StatEnum, StatLabel } from '../../../modules/stat'

const props = defineProps({
  tabKeys: array<StatEnum>().def([]),
  moreTabKeys: array<StatEnum>().def([])
})

const {
  tabs,
  activeTabKey,
  menus,
  menuVisible,
  dropdownLabel,
  handleChangeTab,
  handleClickMenu
} = useMenuTab(props.tabKeys, props.moreTabKeys)

onMounted(() => {
  activeTabKey.value = props.tabKeys[0]
})

function useMenuTab(tabKeys: StatEnum[], moreTabKeys: StatEnum[]) {
  const MORE_LABEL = '更多'
  const MORE_KEY = 'more'

  const activeTabKey = ref('more')

  const tabs = computed<{ key: string; tab: string }[]>(() =>
    tabKeys
      .map((key: StatEnum) => ({
        tab: StatLabel[key],
        key: key as string
      }))
      .concat([
        {
          tab: MORE_LABEL,
          key: MORE_KEY
        }
      ])
  )

  const menus = computed(() =>
    moreTabKeys.map((key: StatEnum) => ({
      label: StatLabel[key],
      value: key
    }))
  )

  const menuVisible = ref(false)

  watch(menuVisible, () => {
    console.log(menuVisible)
  })

  const dropdownLabel = ref('更多')

  const handleChangeTab = (key: string) => {
    console.log(key)
    if (key !== MORE_KEY) {
      activeTabKey.value = key
      dropdownLabel.value = '更多'
    } else {
      menuVisible.value = true
    }
  }

  const handleClickMenu = ({ key }: { key: StatEnum }) => {
    dropdownLabel.value = StatLabel[key]
    activeTabKey.value = MORE_KEY
    menuVisible.value = false
  }

  return {
    tabs,
    activeTabKey,
    menus,
    menuVisible,
    dropdownLabel,
    handleChangeTab,
    handleClickMenu
  }
}
</script>

<style scoped>
:deep(.ant-tabs-tab .anticon) {
  margin-right: 0;
}
</style>
