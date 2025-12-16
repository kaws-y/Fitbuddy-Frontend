<template>
  <view class="container">
    <view class="content">
      <!-- Header -->
      <view class="header">
        <text class="logo-text">FitBuddy Pro</text>
        <text class="subtitle">{{ isRegisterMode ? '创建新账户' : '欢迎回来' }}</text>
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
            @confirm="handleSubmit"
          />
        </view>
        
        <!-- Password -->
        <view class="form-item">
          <view class="label-row">
            <text class="label">密码</text>
            <text v-if="!isRegisterMode" class="forgot-pwd" @click="handleForgotPassword">忘记密码?</text>
          </view>
          <input 
            class="input-field" 
            type="password" 
            placeholder="请输入密码"
            placeholder-class="input-placeholder"
            v-model="formData.password"
            :disabled="isLoading"
            @confirm="handleSubmit"
          />
        </view>
        
        <!-- Confirm Password (Register Mode) -->
        <view v-if="isRegisterMode" class="form-item">
          <text class="label">确认密码</text>
          <input 
            class="input-field" 
            type="password" 
            placeholder="请再次输入密码"
            placeholder-class="input-placeholder"
            v-model="formData.confirmPassword"
            :disabled="isLoading"
            @confirm="handleSubmit"
          />
        </view>
        
        <!-- Error Message -->
        <view v-if="validationError" class="error-message">
          <text class="error-text">{{ validationError }}</text>
        </view>
        
        <!-- Submit Button -->
        <button 
          class="btn-login" 
          @click="handleSubmit"
          :disabled="isLoading"
          :loading="isLoading"
        >
          {{ isLoading ? (isRegisterMode ? '注册中...' : '登录中...') : (isRegisterMode ? '注册' : '登录') }}
        </button>
        
        <!-- Divider -->
        
        <!-- Social Login -->
        
        <!-- Toggle Link -->
        <view class="register-link">
          <text class="no-account">{{ isRegisterMode ? '已有账户? ' : '还没有账户? ' }}</text>
          <text class="link-text" @click="toggleMode">{{ isRegisterMode ? '立即登录' : '立即注册' }}</text>
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
const { login, register, isLoading } = useAuth()

// 页面模式：登录/注册
const isRegisterMode = ref(false)

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 验证错误信息
const validationError = ref('')

/**
 * 切换登录/注册模式
 */
const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value
  validationError.value = ''
  formData.password = ''
  formData.confirmPassword = ''
}

/**
 * 表单验证
 */
const validateForm = (): boolean => {
  validationError.value = ''
  
  // 验证邮箱
  if (!formData.username || formData.username.trim() === '') {
    validationError.value = '请输入邮箱'
    return false
  }
  
  // 简单邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.username.trim())) {
    validationError.value = '请输入有效的邮箱地址'
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
  
  // 注册模式下验证确认密码
  if (isRegisterMode.value) {
    if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
      validationError.value = '请确认密码'
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      validationError.value = '两次输入的密码不一致'
      return false
    }
  }
  
  return true
}

/**
 * 处理提交（登录/注册）
 */
const handleSubmit = async () => {
  if (!validateForm()) {
    uni.showToast({
      title: validationError.value,
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    let success: boolean
    
    if (isRegisterMode.value) {
      // 注册
      success = await register(formData.username.trim(), formData.password)
    } else {
      // 登录
      success = await login(formData.username.trim(), formData.password)
    }
    
    if (success) {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }, 1500)
    }
  } catch (err: any) {
    console.error(isRegisterMode.value ? 'Register error:' : 'Login error:', err)
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
  const action = isRegisterMode.value ? '注册' : '登录'
  uni.showToast({
    title: `${provider} ${action}开发中`,
    icon: 'none'
  })
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
