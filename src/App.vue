<template>
  <div class="app-container">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home" icon="home-o">首頁</van-tabbar-item>
      <van-tabbar-item to="/discover" icon="search">發現</van-tabbar-item>
      <van-tabbar-item to="/catalog" icon="book-o">目錄</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-o">我的</van-tabbar-item>
      <van-tabbar-item to="/player" icon="play-circle-o">播放中</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'App',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  setup() {
    const active = ref(4) // 播放詳情頁為默認頁面
    return { active }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
