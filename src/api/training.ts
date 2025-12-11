/**
 * 训练计划相关 API
 */

import { get, post } from '@/utils/request';
import type { TrainingPlan } from '@/types';

/**
 * 创建训练计划
 */
export const createTrainingPlan = (data: any): Promise<TrainingPlan> => {
  return post<TrainingPlan>('/training/plans', data);
};

/**
 * 获取训练计划列表
 */
export const getTrainingPlans = (): Promise<TrainingPlan[]> => {
  return get<TrainingPlan[]>('/training/plans');
};

/**
 * 获取训练计划详情
 */
export const getTrainingPlan = (id: string): Promise<TrainingPlan> => {
  return get<TrainingPlan>(`/training/plans/${id}`);
};

export default {
  createTrainingPlan,
  getTrainingPlans,
  getTrainingPlan
};
