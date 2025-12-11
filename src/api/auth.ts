/**
 * 认证相关 API
 */

import { post } from '@/utils/request';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

/**
 * 用户注册
 */
export const register = (data: RegisterRequest): Promise<AuthResponse> => {
  return post<AuthResponse>('/auth/register', data);
};

/**
 * 用户登录
 */
export const login = (data: LoginRequest): Promise<AuthResponse> => {
  return post<AuthResponse>('/auth/login', data);
};

export default {
  register,
  login
};
