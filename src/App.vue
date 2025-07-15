<template>
  <div class="app-container">
    <router-view></router-view>
    <VanTabbar v-model="active" route>
      <VanTabbarItem to="/home">
        <template #icon><Icon icon="mdi:home" /></template>
        首頁
      </VanTabbarItem>
      <VanTabbarItem to="/discover">
        <template #icon><Icon icon="mdi:magnify" /></template>
        發現
      </VanTabbarItem>
      <VanTabbarItem to="/catalog">
        <template #icon><Icon icon="mdi:book-open-variant" /></template>
        目錄
      </VanTabbarItem>
      <VanTabbarItem to="/profile">
        <template #icon><Icon icon="mdi:account" /></template>
        我的
      </VanTabbarItem>
      <VanTabbarItem to="/player">
        <template #icon><Icon icon="mdi:play-circle" /></template>
        播放中
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script setup lang="ts">
import {
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem
} from 'vant';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// 當前激活的標籤頁
const active = ref(0) // 將首頁作為默認頁面

// 根據當前路徑設置激活的標籤
const currentPath = window.location.pathname
if (currentPath.includes('/home')) active.value = 0
if (currentPath.includes('/discover')) active.value = 1
if (currentPath.includes('/catalog')) active.value = 2
if (currentPath.includes('/profile')) active.value = 3
if (currentPath.includes('/player')) active.value = 4
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
