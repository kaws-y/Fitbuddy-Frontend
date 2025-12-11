<template>
  <view class="loading-container" v-if="visible">
    <view class="loading-content">
      <view class="loading-spinner"></view>
      <text class="loading-text" v-if="text">{{ text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

interface Props {
  visible?: boolean
  text?: string
}

withDefaults(defineProps<Props>(), {
  visible: true,
  text: '加载中...'
})
</script>

<style scoped>
.loading-container {
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

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 60rpx 80rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 80rpx;
  height: 80rpx;
  border: 6rpx solid #f3f3f3;
  border-top: 6rpx solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #333333;
  text-align: center;
}
</style>
