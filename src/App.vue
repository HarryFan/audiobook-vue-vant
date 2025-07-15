<template>
  <div class="app-container">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <template #icon="props">
          <Icon icon="icon-park-outline:home" :class="props.active ? 'active-icon' : 'inactive-icon'" />
        </template>
        首頁
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon="props">
          <Icon icon="icon-park-outline:search" :class="props.active ? 'active-icon' : 'inactive-icon'" />
        </template>
        發現
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon="props">
          <Icon icon="icon-park-outline:book" :class="props.active ? 'active-icon' : 'inactive-icon'" />
        </template>
        目錄
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon="props">
          <Icon icon="icon-park-outline:user" :class="props.active ? 'active-icon' : 'inactive-icon'" />
        </template>
        我的
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon="props">
          <Icon icon="icon-park-outline:play" :class="props.active ? 'active-icon' : 'inactive-icon'" />
        </template>
        播放中
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { Icon } from '@iconify/vue'

export default {
  name: 'App',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Icon
  },
  setup() {
    const active = ref(4) // 播放詳情頁為默認頁面
    return { active }
  }
}
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.active-icon {
  color: #007BFF;
  font-size: 24px;
}

.inactive-icon {
  color: #888888;
  font-size: 24px;
}
</style>
