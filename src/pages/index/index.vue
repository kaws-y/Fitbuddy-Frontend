<template>
  <view class="container">
    <view class="header">
      <text class="title">FitBuddy Pro 💪</text>
      <text class="subtitle">你的智能健身助手</text>
    </view>
    
    <view class="chat-container">
      <view class="welcome-message">
        <text class="welcome-text">👋 你好！我是 FitBuddy，你的专属健身教练。</text>
        <text class="welcome-text">我可以帮你制定训练计划、营养方案，并跟踪你的进度。</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
  console.log('Index page loaded')
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding-top: 80rpx;
}

.title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

.chat-container {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.welcome-message {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.welcome-text {
  font-size: 28rpx;
  line-height: 1.8;
  color: #333333;
}
</style>
