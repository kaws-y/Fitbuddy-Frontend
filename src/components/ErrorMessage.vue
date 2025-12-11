<template>
  <view class="error-container" v-if="visible">
    <view class="error-content">
      <view class="error-icon">⚠️</view>
      <text class="error-title">{{ title }}</text>
      <text class="error-message">{{ message }}</text>
      <button 
        v-if="showRetry" 
        class="retry-button" 
        @click="handleRetry"
      >
        {{ retryText }}
      </button>
      <button 
        class="close-button" 
        @click="handleClose"
      >
        {{ closeText }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue'

interface Props {
  visible?: boolean
  title?: string
  message: string
  showRetry?: boolean
  retryText?: string
  closeText?: string
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  title: '出错了',
  showRetry: false,
  retryText: '重试',
  closeText: '关闭'
})

const emit = defineEmits<{
  retry: []
  close: []
}>()

const handleRetry = () => {
  emit('retry')
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.error-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 60rpx 80rpx;
  max-width: 600rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.error-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
  text-align: center;
}

.error-message {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 40rpx;
  text-align: center;
  line-height: 1.5;
}

.retry-button,
.close-button {
  width: 400rpx;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
  margin-top: 20rpx;
}

.retry-button {
  background-color: #007aff;
  color: #ffffff;
}

.close-button {
  background-color: #f5f5f5;
  color: #333333;
}

.retry-button:active {
  opacity: 0.8;
}

.close-button:active {
  opacity: 0.8;
}
</style>
