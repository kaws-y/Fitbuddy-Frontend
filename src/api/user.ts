/**
 * 用户相关 API
 */

import { get, put } from '@/utils/request';
import type { User } from '@/types';

/**
 * 获取用户资料
 */
export const getUserProfile = (): Promise<User> => {
  return get<User>('/user/profile');
};

/**
 * 更新用户资料
 */
export const updateUserProfile = (data: Partial<User>): Promise<User> => {
  return put<User>('/user/profile', data);
};

export default {
  getUserProfile,
  updateUserProfile
};
