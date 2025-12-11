<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/* 全局样式 */
page {
  background-color: #f8f8f8;
  font-size: 16px;
  line-height: 1.6;
}

/* 通用容器 */
.container {
  padding: 20rpx;
}

/* 通用按钮样式 */
.btn-primary {
  background-color: #3cc51f;
  color: #ffffff;
  border-radius: 8rpx;
  padding: 20rpx;
  text-align: center;
  font-size: 32rpx;
}

.btn-secondary {
  background-color: #ffffff;
  color: #3cc51f;
  border: 2rpx solid #3cc51f;
  border-radius: 8rpx;
  padding: 20rpx;
  text-align: center;
  font-size: 32rpx;
}

/* 通用卡片样式 */
.card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

/* 通用输入框样式 */
.input-field {
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}

/* 通用文本样式 */
.text-primary {
  color: #3cc51f;
}

.text-secondary {
  color: #7a7e83;
}

.text-error {
  color: #ff4d4f;
}

/* 通用间距 */
.mt-10 {
  margin-top: 10rpx;
}

.mt-20 {
  margin-top: 20rpx;
}

.mt-30 {
  margin-top: 30rpx;
}

.mb-10 {
  margin-bottom: 10rpx;
}

.mb-20 {
  margin-bottom: 20rpx;
}

.mb-30 {
  margin-bottom: 30rpx;
}
</style>
