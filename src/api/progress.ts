/**
 * 进度跟踪相关 API
 */

import { get, post } from '@/utils/request';
import type { ProgressRecord } from '@/types';

/**
 * 记录进度
 */
export const recordProgress = (data: Partial<ProgressRecord>): Promise<ProgressRecord> => {
  return post<ProgressRecord>('/progress/record', data);
};

/**
 * 获取进度历史
 */
export const getProgressHistory = (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ProgressRecord[]> => {
  return get<ProgressRecord[]>('/progress/history', params);
};

export default {
  recordProgress,
  getProgressHistory
};
