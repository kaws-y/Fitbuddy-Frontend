import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'

/**
 * 用户状态管理 Store
 * 管理用户信息、认证状态和 token
 * Requirements: 2.3
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const isAuthenticated = ref<boolean>(false)

  // 计算属性
  const userId = computed(() => user.value?.id || '')
  const username = computed(() => user.value?.username || '')
  const userProfile = computed(() => user.value?.profile || {})

  /**
   * 设置用户信息和 token
   */
  function setUser(userData: User, authToken: string) {
    user.value = userData
    token.value = authToken
    isAuthenticated.value = true
    
    // 持久化到本地存储
    try {
      uni.setStorageSync('user', JSON.stringify(userData))
      uni.setStorageSync('token', authToken)
    } catch (error) {
      console.error('Failed to save user data to storage:', error)
    }
  }

  /**
   * 更新用户信息
   */
  function updateUser(userData: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      
      // 更新本地存储
      try {
        uni.setStorageSync('user', JSON.stringify(user.value))
      } catch (error) {
        console.error('Failed to update user data in storage:', error)
      }
    }
  }

  /**
   * 更新用户资料
   */
  function updateProfile(profileData: Partial<User['profile']>) {
    if (user.value) {
      user.value.profile = { ...user.value.profile, ...profileData }
      
      // 更新本地存储
      try {
        uni.setStorageSync('user', JSON.stringify(user.value))
      } catch (error) {
        console.error('Failed to update profile in storage:', error)
      }
    }
  }

  /**
   * 从本地存储恢复用户状态
   */
  function restoreUser() {
    try {
      const storedUser = uni.getStorageSync('user')
      const storedToken = uni.getStorageSync('token')
      
      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
        isAuthenticated.value = true
        return true
      }
    } catch (error) {
      console.error('Failed to restore user from storage:', error)
    }
    return false
  }

  /**
   * 清除用户状态（登出）
   */
  function clearUser() {
    user.value = null
    token.value = ''
    isAuthenticated.value = false
    
    // 清除本地存储
    try {
      uni.removeStorageSync('user')
      uni.removeStorageSync('token')
    } catch (error) {
      console.error('Failed to clear user data from storage:', error)
    }
  }

  /**
   * 获取认证 token
   */
  function getToken(): string {
    return token.value
  }

  return {
    // 状态
    user,
    token,
    isAuthenticated,
    
    // 计算属性
    userId,
    username,
    userProfile,
    
    // 方法
    setUser,
    updateUser,
    updateProfile,
    restoreUser,
    clearUser,
    getToken
  }
})
