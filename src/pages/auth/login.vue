<template>
  <view class="container">
    <view class="login-box">
      <view class="logo">
        <text class="logo-text">FitBuddy Pro 💪</text>
      </view>
      
      <view class="form">
        <view class="form-item">
          <input 
            class="input-field" 
            type="text" 
            placeholder="用户名或邮箱"
            v-model="formData.username"
            :disabled="isLoading"
            @confirm="handleLogin"
          />
        </view>
        
        <view class="form-item">
          <input 
            class="input-field" 
            type="password" 
            placeholder="密码"
            v-model="formData.password"
            :disabled="isLoading"
            @confirm="handleLogin"
          />
        </view>
        
        <!-- 错误提示 -->
        <view v-if="validationError" class="error-message">
          <text class="error-text">{{ validationError }}</text>
        </view>
        
        <button 
          class="btn-primary" 
          @click="handleLogin"
          :disabled="isLoading"
          :loading="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
        
        <view class="register-link">
          <text class="link-text" @click="goToRegister">还没有账号？立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'

// 使用 useAuth composable
const { login, isLoading } = useAuth()

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
 * 跳转到注册页
 */
const goToRegister = () => {
  if (isLoading.value) return
  
  uni.navigateTo({
    url: '/pages/auth/register'
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.login-box {
  width: 100%;
  max-width: 600rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.logo {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #667eea;
}

.form {
  width: 100%;
}

.form-item {
  margin-bottom: 30rpx;
}

.input-field {
  width: 100%;
  height: 88rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  background-color: #f8f9fa;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #667eea;
  background-color: #ffffff;
}

.input-field:disabled {
  opacity: 0.6;
  background-color: #f0f0f0;
}

.error-message {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #fff3f3;
  border-radius: 8rpx;
  border-left: 4rpx solid #ff4d4f;
}

.error-text {
  font-size: 26rpx;
  color: #ff4d4f;
}

.btn-primary {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  border-radius: 12rpx;
  text-align: center;
  margin-top: 20rpx;
}

.btn-primary:disabled {
  opacity: 0.6;
}

.btn-primary::after {
  border: none;
}

.register-link {
  text-align: center;
  margin-top: 40rpx;
}

.link-text {
  color: #667eea;
  font-size: 28rpx;
  text-decoration: underline;
}
</style>
