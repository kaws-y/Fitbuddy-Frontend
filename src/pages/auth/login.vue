<template>
  <view class="container">
    <view class="content">
      <!-- Header -->
      <view class="header">
        <text class="logo-text">FitBuddy Pro</text>
        <text class="subtitle">欢迎回来</text>
      </view>
      
      <view class="form">
        <!-- Username/Email -->
        <view class="form-item">
          <text class="label">邮箱地址</text>
          <input 
            class="input-field" 
            type="text" 
            placeholder="请输入邮箱"
            placeholder-class="input-placeholder"
            v-model="formData.username"
            :disabled="isLoading"
            @confirm="handleLogin"
          />
        </view>
        
        <!-- Password -->
        <view class="form-item">
          <view class="label-row">
            <text class="label">密码</text>
            <text class="forgot-pwd" @click="handleForgotPassword">忘记密码?</text>
          </view>
          <input 
            class="input-field" 
            type="password" 
            placeholder="请输入密码"
            placeholder-class="input-placeholder"
            v-model="formData.password"
            :disabled="isLoading"
            @confirm="handleLogin"
          />
        </view>
        
        <!-- Error Message -->
        <view v-if="validationError" class="error-message">
          <text class="error-text">{{ validationError }}</text>
        </view>
        
        <!-- Login Button -->
        <button 
          class="btn-login" 
          @click="handleLogin"
          :disabled="isLoading"
          :loading="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
        
        <!-- Divider -->
        <view class="divider">
          <view class="line"></view>
          <text class="divider-text">或</text>
          <view class="line"></view>
        </view>
        
        <!-- Social Login -->
        <view class="social-login">
          <button class="btn-social" @click="handleSocialLogin('wechat')">
            <text class="social-text">使用微信登录</text>
          </button>
          <button class="btn-social" @click="handleSocialLogin('apple')">
            <text class="social-text">使用Apple登录</text>
          </button>
          <button class="btn-social" @click="handleSocialLogin('google')">
            <text class="social-text">使用Google登录</text>
          </button>
        </view>
        
        <!-- Register Link -->
        <view class="register-link">
          <text class="no-account">还没有账户? </text>
          <text class="link-text" @click="goToRegister">立即注册</text>
        </view>
      </view>
    </view>
    
    <!-- Footer -->
    <view class="footer">
      <text class="footer-text">继续即表示您同意我们的 服务条款 和 隐私政策</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'

// 使用 useAuth composable
const { login, isLoading, pageType } = useAuth()

// 表单数据
const formData = reactive({
  username: '',
  password: ''
})

// 验证错误信息
const validationError = ref('')

/**
 * 表单验证
 */
const validateForm = (): boolean => {
  validationError.value = ''
  
  // 验证用户名
  if (!formData.username || formData.username.trim() === '') {
    validationError.value = '请输入用户名或邮箱'
    return false
  }
  
  if (formData.username.length < 3) {
    validationError.value = '用户名至少3个字符'
    return false
  }
  
  // 验证密码
  if (!formData.password || formData.password.trim() === '') {
    validationError.value = '请输入密码'
    return false
  }
  
  if (formData.password.length < 6) {
    validationError.value = '密码至少6位'
    return false
  }
  
  return true
}

/**
 * 处理登录
 */
const handleLogin = async () => {
  // 表单验证
  if (!validateForm()) {
    uni.showToast({
      title: validationError.value,
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    // 调用登录方法
    const success = await login(formData.username.trim(), formData.password)
    
    if (success) {
      // 登录成功，跳转到首页
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }, 1500)
    }
  } catch (err: any) {
    // 错误已在 useAuth 中处理
    console.error('Login error:', err)
  }
}

/**
 * 忘记密码
 */
const handleForgotPassword = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 社交登录
 */
const handleSocialLogin = (provider: string) => {
  uni.showToast({
    title: `${provider} 登录开发中`,
    icon: 'none'
  })
}

/**
 * 跳转到注册页
 */
const goToRegister = () => {
  this.pageType = 'register'
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #121212;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo-text {
  font-size: 56rpx;
  font-weight: bold;
  color: #2bc158;
  display: block;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 32rpx;
  color: #a0a0a0;
}

.form {
  width: 100%;
  padding: 0 20rpx;
}

.form-item {
  margin-bottom: 40rpx;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.label {
  font-size: 28rpx;
  color: #ffffff;
  margin-bottom: 16rpx;
  display: block;
}

.input-field {
  width: 100%;
  height: 96rpx;
  background-color: #2c2c2c;
  border-radius: 16rpx;
  padding: 0 32rpx;
  font-size: 30rpx;
  color: #ffffff;
  box-sizing: border-box;
}

.input-placeholder {
  color: #666666;
}

.forgot-pwd {
  font-size: 26rpx;
  color: #2bc158;
}

.error-message {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background-color: rgba(255, 77, 79, 0.1);
  border-radius: 8rpx;
  border-left: 4rpx solid #ff4d4f;
}

.error-text {
  font-size: 26rpx;
  color: #ff4d4f;
}

.btn-login {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background-color: #2bc158;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: bold;
  border-radius: 16rpx;
  border: none;
  margin-top: 20rpx;
}

.btn-login::after {
  border: none;
}

.divider {
  display: flex;
  align-items: center;
  margin: 60rpx 0;
}

.line {
  flex: 1;
  height: 2rpx;
  background-color: #333333;
}

.divider-text {
  margin: 0 30rpx;
  color: #666666;
  font-size: 28rpx;
}

.social-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.btn-social {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background-color: transparent;
  border: 2rpx solid #333333;
  border-radius: 16rpx;
  color: #ffffff;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-social::after {
  border: none;
}

.social-text {
  margin-left: 16rpx;
}

.register-link {
  text-align: center;
  margin-top: 60rpx;
}

.no-account {
  color: #a0a0a0;
  font-size: 28rpx;
}

.link-text {
  color: #2bc158;
  font-size: 28rpx;
  font-weight: bold;
}

.footer {
  width: 100%;
  text-align: center;
  padding: 40rpx 0;
}

.footer-text {
  font-size: 24rpx;
  color: #666666;
}
</style>
