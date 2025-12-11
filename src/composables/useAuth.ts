/**
 * useAuth Composable
 * 认证相关的可复用逻辑
 * Requirements: 2.3
 */

import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import * as authApi from '@/api/auth';
import type { LoginRequest, RegisterRequest } from '@/types';
import { logger } from '@/utils/logger';

export const useAuth = () => {
  const userStore = useUserStore();
  
  // 状态
  const isLoading = ref(false);
  const error = ref<string>('');

  // 计算属性
  const isAuthenticated = computed(() => userStore.isAuthenticated);
  const user = computed(() => userStore.user);
  const token = computed(() => userStore.token);

  /**
   * 用户登录
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Attempting login', { username });

      const loginData: LoginRequest = {
        username,
        password
      };

      const response = await authApi.login(loginData);

      // 保存用户信息和 token
      userStore.setUser(response.user, response.token);

      logger.info('Login successful', { userId: response.user.id });

      // 显示成功提示
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });

      return true;
    } catch (err: any) {
      logger.error('Login failed', err);
      error.value = err.message || '登录失败';
      
      // 错误提示已在 request 工具中处理
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 用户注册
   */
  const register = async (
    username: string,
    email: string,
    password: string,
    profile?: any
  ): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Attempting registration', { username, email });

      const registerData: RegisterRequest = {
        username,
        email,
        password,
        profile
      };

      const response = await authApi.register(registerData);

      // 保存用户信息和 token
      userStore.setUser(response.user, response.token);

      logger.info('Registration successful', { userId: response.user.id });

      // 显示成功提示
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      });

      return true;
    } catch (err: any) {
      logger.error('Registration failed', err);
      error.value = err.message || '注册失败';
      
      // 错误提示已在 request 工具中处理
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 用户登出
   */
  const logout = async (): Promise<void> => {
    try {
      logger.info('User logging out', { userId: userStore.userId });

      // 清除用户状态
      userStore.clearUser();

      // 显示提示
      uni.showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 1500
      });

      // 跳转到登录页
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/auth/login'
        });
      }, 1500);
    } catch (err: any) {
      logger.error('Logout failed', err);
      
      // 即使出错也清除本地状态
      userStore.clearUser();
      
      uni.reLaunch({
        url: '/pages/auth/login'
      });
    }
  };

  /**
   * 检查认证状态
   */
  const checkAuth = (): boolean => {
    return userStore.isAuthenticated && !!userStore.token;
  };

  /**
   * 恢复用户会话
   */
  const restoreSession = (): boolean => {
    try {
      const restored = userStore.restoreUser();
      if (restored) {
        logger.info('Session restored', { userId: userStore.userId });
      }
      return restored;
    } catch (err: any) {
      logger.error('Failed to restore session', err);
      return false;
    }
  };

  return {
    // 状态
    isLoading,
    error,
    
    // 计算属性
    isAuthenticated,
    user,
    token,
    
    // 方法
    login,
    register,
    logout,
    checkAuth,
    restoreSession
  };
};

export default useAuth;
