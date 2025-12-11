/**
 * 营养计划相关 API
 */

import { get, post } from '@/utils/request';
import type { NutritionPlan } from '@/types';

/**
 * 创建营养计划
 */
export const createNutritionPlan = (data: any): Promise<NutritionPlan> => {
  return post<NutritionPlan>('/nutrition/plans', data);
};

/**
 * 获取营养计划列表
 */
export const getNutritionPlans = (): Promise<NutritionPlan[]> => {
  return get<NutritionPlan[]>('/nutrition/plans');
};

/**
 * 获取营养计划详情
 */
export const getNutritionPlan = (id: string): Promise<NutritionPlan> => {
  return get<NutritionPlan>(`/nutrition/plans/${id}`);
};

export default {
  createNutritionPlan,
  getNutritionPlans,
  getNutritionPlan
};
