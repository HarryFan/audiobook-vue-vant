<template>
  <div class="loading-container" :class="{ overlay: overlay }">
    <van-loading :color="color" :size="size" :vertical="vertical">
      {{ text }}
    </van-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Loading } from 'vant'

export default defineComponent({
  name: 'AppLoading',
  components: {
    [Loading.name]: Loading
  },
  props: {
    text: {
      type: String,
      default: '載入中...'
    },
    color: {
      type: String,
      default: '#1989fa'
    },
    size: {
      type: [String, Number],
      default: '24px'
    },
    vertical: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  
  &.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
  }
}
</style>
