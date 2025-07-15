<template>
  <div class="empty-state">
    <Icon :icon="icon" class="empty-icon" :style="{ color: iconColor }" />
    <p class="empty-text">{{ text }}</p>
    <van-button 
      v-if="showButton" 
      type="primary" 
      size="small" 
      round 
      @click="$emit('buttonClick')"
    >
      {{ buttonText }}
    </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'EmptyState',
  components: {
    [Button.name]: Button,
    Icon
  },
  props: {
    text: {
      type: String,
      default: '暫無數據'
    },
    icon: {
      type: String,
      default: 'ion:document-text-outline'
    },
    iconColor: {
      type: String,
      default: '#ccc'
    },
    showButton: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: '刷新'
    }
  },
  emits: ['buttonClick']
})
</script>

<style lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  text-align: center;
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }
  
  .empty-text {
    font-size: 14px;
    color: #999;
    margin-bottom: 16px;
  }
}
</style>
