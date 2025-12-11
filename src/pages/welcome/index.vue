<template>
  <div class="welcome-container" @click="handleScreenClick">
    <!-- 炫酷动态背景 -->
    <div class="background-effects">
      <div class="effect-line line-1"></div>
      <div class="effect-line line-2"></div>
      <div class="effect-line line-3"></div>
      <div class="effect-glow"></div>
      <div class="particles">
        <div v-for="i in 10" :key="i" class="particle" :style="getParticleStyle()"></div>
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="content-wrapper">
      <!-- Logo 区域 -->
      <div class="logo-box animate-item">
        <text class="logo-text">FitBuddy</text>
        <div class="logo-underline"></div>
      </div>

      <!-- 口号区域 -->
      <div class="slogan-box animate-item delay-1">
        <!-- 背景大字 -->
        <text class="bg-fitness">FITNESS</text>
        <!-- 前景中文 -->
        <text class="main-slogan">简单、科学、可坚持、可量化的运动体验。</text>
      </div>

      <!-- 按钮区域 -->
      <div class="btn-box animate-item delay-2">
        <button class="start-btn" hover-class="btn-hover" @click.stop="handleStart">
          开启您的运动之旅
        </button>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="footer-box animate-item delay-3">
      <text class="footer-tip">点击屏幕继续</text>
      <div class="dots-indicator">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 粒子随机样式生成
const getParticleStyle = () => {
  const size = Math.random() * 4 + 2 + 'px';
  const left = Math.random() * 100 + '%';
  const top = Math.random() * 100 + '%';
  const delay = Math.random() * 5 + 's';
  const duration = Math.random() * 3 + 3 + 's';
  return {
    width: size,
    height: size,
    left: left,
    top: top,
    animationDelay: delay,
    animationDuration: duration
  };
};

// 页面加载后的逻辑
onMounted(() => {
  // 这里可以添加初始化逻辑，比如预加载下一页数据
  console.log('Welcome Page Mounted');
});

// 点击按钮
const handleStart = () => {
  console.log('Start Button Clicked');
  // 示例：跳转到首页或登录页
  uni.switchTab({ url: '/pages/index/index' });
};

// 点击屏幕
const handleScreenClick = () => {
  console.log('Screen Clicked');e
  handleStart();
};
</script>

<style lang="scss" scoped>
/* 颜色变量 */
$primary-green: #2ecc71;
$bg-black: #050505;
$text-white: #ffffff;

.welcome-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $bg-black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* --- 动态背景效果 --- */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.effect-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba($primary-green, 0.2), transparent);
  transform: rotate(-45deg);
  width: 150%;
  height: 100px;
  left: -25%;
}

.line-1 {
  top: 10%;
  animation: slideMove 8s infinite linear;
}
.line-2 {
  top: 40%;
  height: 50px;
  background: linear-gradient(90deg, transparent, rgba($primary-green, 0.1), transparent);
  animation: slideMove 12s infinite linear reverse;
}
.line-3 {
  bottom: 20%;
  height: 150px;
  background: linear-gradient(90deg, transparent, rgba($primary-green, 0.15), transparent);
  animation: slideMove 10s infinite linear;
}

.effect-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vw;
  background: radial-gradient(circle, rgba($primary-green, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 4s infinite ease-in-out;
}

.particle {
  position: absolute;
  background-color: rgba($primary-green, 0.6);
  border-radius: 50%;
  animation: floatUp linear infinite;
}

/* --- 内容区域 --- */
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
  padding-bottom: 100rpx; /* 向上偏移一点视觉中心 */
}

/* Logo */
.logo-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-text {
  font-size: 80rpx;
  font-weight: 900;
  color: $text-white;
  letter-spacing: 2px;
}

.logo-underline {
  width: 80rpx;
  height: 8rpx;
  background-color: $primary-green;
  margin-top: 10rpx;
  border-radius: 4rpx;
}

/* Slogan */
.slogan-box {
  position: relative;
  width: 100%;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100rpx;
}

.bg-fitness {
  position: absolute;
  font-size: 140rpx;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.08);
  letter-spacing: 10rpx;
  z-index: -1;
  white-space: nowrap;
}

.main-slogan {
  font-size: 32rpx;
  color: #e0e0e0;
  font-weight: 500;
  text-align: center;
  width: 90%;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* Button */
.btn-box {
  width: 60%;
}

.start-btn {
  background-color: $primary-green;
  color: $text-white;
  font-size: 36rpx;
  font-weight: bold;
  border-radius: 50rpx;
  border: none;
  padding: 0;
  box-shadow: 0 4px 15px rgba($primary-green, 0.4);
}

.btn-hover {
  opacity: 0.9;
  transform: scale(0.98);
}

/* --- 底部 --- */
.footer-box {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.footer-tip {
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.dots-indicator {
  display: flex;
  gap: 12rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.dot.active {
  background-color: $primary-green;
  width: 30rpx;
  border-radius: 6rpx;
}

/* --- 动画定义 --- */
@keyframes slideMove {
  0% { transform: translateX(-50%) rotate(-45deg); }
  100% { transform: translateX(50%) rotate(-45deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes floatUp {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-20vh); opacity: 0; }
}

/* 上浮显现动画类 */
.animate-item {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>