<template>
  <view class="container">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">个人中心</text>
    </view>

    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <view class="avatar-section">
          <image class="avatar" src="/static/avatar-placeholder.png" mode="aspectFill" />
          <view class="user-details">
            <view class="name-row">
              <text class="user-name">张三</text>
              <view class="edit-btn">
                <text class="edit-icon">✎</text>
              </view>
            </view>
            <text class="user-goal">减脂与心肺提升</text>
            <text class="user-stats">30 岁 · 178 cm · 75 kg</text>
          </view>
        </view>
      </view>
      <view class="metrics-row">
        <view class="metric-item">
          <text class="metric-label">BMI</text>
          <text class="metric-value">23.7</text>
        </view>
        <view class="metric-item">
          <text class="metric-label">性别</text>
          <text class="metric-value">男</text>
        </view>
        <view class="metric-item">
          <text class="metric-label">会员等级</text>
          <text class="metric-value highlight">Pro</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单列表 -->
    <view class="menu-list">
      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">📋</text>
        </view>
        <view class="menu-content">
          <text class="menu-title">我的档案</text>
          <text class="menu-desc">更新体重、目标和个人信息</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">⌚</text>
        </view>
        <view class="menu-content">
          <text class="menu-title">设备管理</text>
          <text class="menu-desc">LoopWatch 已连接，电量 85%</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">🏆</text>
        </view>
        <view class="menu-content">
          <text class="menu-title">成就徽章</text>
          <text class="menu-desc">已解锁 12 个徽章，新的挑战已开启</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon-wrapper lightning">
          <text class="menu-icon">⚡</text>
        </view>
        <view class="menu-content">
          <text class="menu-title">订阅与会员服务</text>
          <text class="menu-desc">LoopFit Pro 会员 (剩余 90 天)</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>

      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">📊</text>
        </view>
        <view class="menu-content">
          <text class="menu-title">训练历史记录</text>
          <text class="menu-desc">共完成 45 次训练，总时长 35 小时</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 更多选项 -->
    <view class="more-section">
      <text class="section-title">更多选项</text>
      <view class="more-list">
        <view class="more-item">
          <text class="more-icon">⚙</text>
          <text class="more-text">设置与隐私</text>
        </view>
        <view class="more-item">
          <text class="more-icon">❓</text>
          <text class="more-text">帮助与反馈</text>
        </view>
        <view class="more-item logout">
          <text class="more-icon">🚪</text>
          <text class="more-text">退出登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #0a0a0a;
  padding: 0 32rpx 60rpx;
}

.header {
  padding: 40rpx 0;
  text-align: center;
  border-bottom: 1rpx solid #1a1a1a;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
  color: #ffffff;
}

/* 用户信息卡片 */
.user-card {
  background: linear-gradient(135deg, #1a2a1a 0%, #0d1a0d 100%);
  border: 1rpx solid #2a3a2a;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-top: 32rpx;
}

.user-info {
  margin-bottom: 32rpx;
}

.avatar-section {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 3rpx solid #00ff88;
  margin-right: 24rpx;
  background-color: #333;
}

.user-details {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  margin-right: 16rpx;
}

.edit-btn {
  width: 48rpx;
  height: 48rpx;
  background-color: #00ff88;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon {
  font-size: 24rpx;
  color: #000000;
}

.user-goal {
  font-size: 26rpx;
  color: #888888;
  display: block;
  margin-bottom: 4rpx;
}

.user-stats {
  font-size: 24rpx;
  color: #666666;
}

.metrics-row {
  display: flex;
  justify-content: space-around;
  padding-top: 24rpx;
  border-top: 1rpx solid #2a3a2a;
}

.metric-item {
  text-align: center;
}

.metric-label {
  font-size: 24rpx;
  color: #666666;
  display: block;
  margin-bottom: 8rpx;
}

.metric-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.metric-value.highlight {
  color: #00ff88;
  font-style: italic;
}

/* 功能菜单列表 */
.menu-list {
  margin-top: 32rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  background-color: #111111;
  border: 1rpx solid #1a1a1a;
  border-radius: 20rpx;
  padding: 28rpx 24rpx;
  margin-bottom: 20rpx;
}

.menu-icon-wrapper {
  width: 72rpx;
  height: 72rpx;
  background-color: #1a2a1a;
  border: 1rpx solid #2a3a2a;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.menu-icon-wrapper.lightning {
  background-color: #2a2a1a;
  border-color: #3a3a2a;
}

.menu-icon {
  font-size: 32rpx;
}

.menu-content {
  flex: 1;
}

.menu-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #ffffff;
  display: block;
  margin-bottom: 6rpx;
}

.menu-desc {
  font-size: 24rpx;
  color: #666666;
}

.menu-arrow {
  font-size: 40rpx;
  color: #444444;
}

/* 更多选项 */
.more-section {
  margin-top: 48rpx;
}

.section-title {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 24rpx;
  display: block;
}

.more-list {
  padding-left: 8rpx;
}

.more-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
}

.more-icon {
  font-size: 32rpx;
  margin-right: 24rpx;
  width: 40rpx;
}

.more-text {
  font-size: 28rpx;
  color: #888888;
}

.more-item.logout .more-text {
  color: #00ff88;
}
</style>
