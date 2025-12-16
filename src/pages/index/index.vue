<template>
  <view class="container">
    <!-- 顶部区域 -->
    <view class="header">
      <view class="header-left">
        <text class="greeting">下午好</text>
        <text class="username">张三</text>
      </view>
      <image class="avatar" src="/static/avatar.png" mode="aspectFill" />
    </view>

    <!-- 天气和电量 -->
    <view class="status-bar">
      <view class="weather">
        <text class="weather-icon">☁</text>
        <text class="weather-text">24°C</text>
      </view>
    </view>

    <!-- 今日健康概览 -->
    <view class="section">
      <text class="section-title">今日健康概览</text>
      
      <view class="health-cards">
        <!-- 步数卡片 -->
        <view class="health-card steps-card">
          <view class="card-header">
            <text class="card-label">步数</text>
            <text class="card-trend trend-up">📈</text>
          </view>
          <text class="card-value">7856</text>
          <text class="card-unit">步</text>
          <text class="card-compare">与昨日↑ 12%</text>
        </view>

        <!-- 消耗卡路里卡片 -->
        <view class="health-card calories-card">
          <view class="card-header">
            <text class="card-label">消耗卡路里</text>
            <text class="card-trend trend-down">↘ 5%</text>
          </view>
          <text class="card-value">550</text>
          <text class="card-unit">Kcal</text>
          <text class="card-compare">与昨日↓ 5%</text>
        </view>

        <!-- 平均心率卡片 -->
        <view class="health-card heart-card">
          <view class="card-header">
            <text class="card-label">平均心率</text>
            <text class="card-trend">📊</text>
          </view>
          <text class="card-value">68</text>
          <text class="card-unit">bpm</text>
          <text class="card-compare">与昨日↑ 2%</text>
        </view>
      </view>
    </view>

    <!-- 今日训练计划 -->
    <view class="section">
      <text class="section-title">今日训练计划</text>
      
      <view class="training-card">
        <view class="training-header">
          <view class="training-info">
            <text class="training-name">全身燃脂 HIIT</text>
            <text class="training-desc">高强度间歇训练</text>
          </view>
          <text class="training-icon">⚡</text>
        </view>

        <view class="training-stats">
          <view class="stat-item">
            <text class="stat-label">预计消耗</text>
            <text class="stat-value">380 Kcal</text>
          </view>
          <view class="stat-item">
            <text class="stat-label">预计时长</text>
            <text class="stat-value">35 分钟</text>
          </view>
        </view>

        <view class="progress-section">
          <text class="progress-label">完成进度</text>
          <view class="progress-bar">
            <view class="progress-fill" style="width: 65%"></view>
          </view>
          <text class="progress-text">65% 已完成</text>
        </view>

        <view class="start-btn">
          <text class="start-icon">▷</text>
          <text class="start-text">开始训练</text>
        </view>
      </view>
    </view>

    <!-- 关键数据趋势 -->
    <view class="section">
      <text class="section-title">关键数据趋势</text>
      
      <view class="trend-card">
        <view class="trend-header">
          <text class="trend-title">睡眠分数</text>
          <text class="trend-icon">📈</text>
        </view>
        <text class="trend-desc">昨晚深睡时间不足，效率评分 78。</text>
      </view>
    </view>

    <!-- AI计划按钮 -->
    <view class="ai-buttons">
      <view class="ai-btn">
        <text class="ai-btn-icon">✨</text>
        <text class="ai-btn-text">AI计划</text>
      </view>
      <view class="ai-btn">
        <text class="ai-btn-icon">📊</text>
        <text class="ai-btn-text">数据中心</text>
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
  background-color: #0a0a0a;
  padding: 40rpx 32rpx;
  padding-bottom: 180rpx;
  &:scrollbar {
    display: none;
  }
}

.container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 顶部区域 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.greeting {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8rpx;
}

.username {
  font-size: 44rpx;
  font-weight: bold;
  color: #ffffff;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #333;
}

/* 状态栏 */
.status-bar {
  display: flex;
  gap: 40rpx;
  margin-bottom: 48rpx;
}

.weather, .battery {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.weather-icon, .battery-icon {
  font-size: 28rpx;
  color: #fff
}

.weather-text, .battery-text {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
}

/* 区块标题 */
.section {
  margin-bottom: 48rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 24rpx;
  display: block;
}

/* 健康卡片 */
.health-cards {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.health-card {
  border-radius: 24rpx;
  padding: 28rpx 32rpx;
  position: relative;
}

.steps-card {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}

.calories-card {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.heart-card {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.card-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

.card-trend {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.card-value {
  font-size: 56rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
}

.card-unit {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 8rpx;
}

.card-compare {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8rpx;
  display: block;
}

/* 训练卡片 */
.training-card {
  background-color: #1a1a1a;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1rpx solid #333;
}

.training-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.training-info {
  display: flex;
  flex-direction: column;
}

.training-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8rpx;
}

.training-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
}

.training-icon {
  font-size: 40rpx;
  color: #4ade80;
}

.training-stats {
  display: flex;
  gap: 80rpx;
  margin-bottom: 32rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8rpx;
}

.stat-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.progress-section {
  margin-bottom: 32rpx;
}

.progress-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16rpx;
  display: block;
}

.progress-bar {
  height: 12rpx;
  background-color: #333;
  border-radius: 6rpx;
  overflow: hidden;
  margin-bottom: 12rpx;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  border-radius: 6rpx;
}

.progress-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
}

.start-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  background-color: #4ade80;
  border-radius: 48rpx;
  padding: 24rpx;
  margin-top: 16rpx;
}

.start-icon {
  font-size: 28rpx;
  color: #fff;
}

.start-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
}

/* 趋势卡片 */
.trend-card {
  background-color: #1a1a1a;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1rpx solid #333;
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.trend-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.trend-icon {
  font-size: 32rpx;
  color: #4ade80;
}

.trend-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

/* AI按钮 */
.ai-buttons {
  display: flex;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

.ai-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  background-color: #1a1a1a;
  border: 1rpx solid #4ade80;
  border-radius: 48rpx;
  padding: 24rpx;
}

.ai-btn-icon {
  font-size: 28rpx;
}

.ai-btn-text {
  font-size: 28rpx;
  color: #4ade80;
}

/* 底部导航 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #0a0a0a;
  border-top: 1rpx solid #222;
  padding: 20rpx 0;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.tab-icon {
  font-size: 40rpx;
}

.tab-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.5);
}

.tab-item.active .tab-text {
  color: #4ade80;
}
</style>
