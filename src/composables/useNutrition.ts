/**
 * useNutrition Composable
 * 营养计划相关的可复用逻辑
 * Requirements: 2.3
 */

import { ref, computed } from 'vue';
import { useNutritionStore } from '@/stores/nutritionStore';
import * as nutritionApi from '@/api/nutrition';
import type { NutritionPlan } from '@/types';
import { logger } from '@/utils/logger';

export const useNutrition = () => {
  const nutritionStore = useNutritionStore();
  
  // 状态
  const isLoading = ref(false);
  const error = ref<string>('');

  // 计算属性
  const plans = computed(() => nutritionStore.plans);
  const currentPlan = computed(() => nutritionStore.currentPlan);
  const hasPlan = computed(() => nutritionStore.plans.length > 0);

  /**
   * 生成营养计划
   */
  const generatePlan = async (planData: {
    goal: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    activityLevel?: string;
    dietaryRestrictions?: string[];
    mealsPerDay?: number;
  }): Promise<NutritionPlan | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Generating nutrition plan', { goal: planData.goal });

      // 显示加载提示
      uni.showLoading({
        title: '正在生成营养计划...',
        mask: true
      });

      // 调用 API 生成计划
      const plan = await nutritionApi.createNutritionPlan(planData);

      // 添加到 store
      nutritionStore.addPlan(plan);
      nutritionStore.setCurrentPlan(plan);

      // 隐藏加载提示
      uni.hideLoading();

      // 显示成功提示
      uni.showToast({
        title: '营养计划生成成功',
        icon: 'success',
        duration: 2000
      });

      logger.info('Nutrition plan generated successfully', { planId: plan.id });

      return plan;
    } catch (err: any) {
      logger.error('Failed to generate nutrition plan', err);
      error.value = err.message || '生成营养计划失败';
      
      // 隐藏加载提示
      uni.hideLoading();
      
      // 错误提示已在 request 工具中处理
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取营养计划列表
   */
  const getPlans = async (): Promise<NutritionPlan[]> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Fetching nutrition plans');

      // 调用 API 获取计划列表
      const planList = await nutritionApi.getNutritionPlans();

      // 更新 store
      nutritionStore.setPlans(planList);

      logger.info('Nutrition plans fetched successfully', { count: planList.length });

      return planList;
    } catch (err: any) {
      logger.error('Failed to fetch nutrition plans', err);
      error.value = err.message || '获取营养计划失败';
      
      // 错误提示已在 request 工具中处理
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取营养计划详情
   */
  const getPlanDetail = async (planId: string): Promise<NutritionPlan | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Fetching nutrition plan detail', { planId });

      // 调用 API 获取计划详情
      const plan = await nutritionApi.getNutritionPlan(planId);

      // 设置为当前计划
      nutritionStore.setCurrentPlan(plan);

      logger.info('Nutrition plan detail fetched successfully', { planId });

      return plan;
    } catch (err: any) {
      logger.error('Failed to fetch nutrition plan detail', err);
      error.value = err.message || '获取营养计划详情失败';
      
      // 错误提示已在 request 工具中处理
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 设置当前营养计划
   */
  const setCurrentPlan = (plan: NutritionPlan | null) => {
    nutritionStore.setCurrentPlan(plan);
  };

  /**
   * 删除营养计划
   */
  const deletePlan = (planId: string) => {
    nutritionStore.deletePlan(planId);
    
    uni.showToast({
      title: '营养计划已删除',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 清空所有营养计划
   */
  const clearPlans = () => {
    nutritionStore.clearPlans();
    
    uni.showToast({
      title: '所有营养计划已清空',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 刷新营养计划列表
   */
  const refreshPlans = async (): Promise<void> => {
    await getPlans();
  };

  /**
   * 计算 BMR（基础代谢率）
   * 使用 Mifflin-St Jeor 公式
   */
  const calculateBMR = (
    weight: number,
    height: number,
    age: number,
    gender: string
  ): number => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  /**
   * 计算 TDEE（每日总能量消耗）
   */
  const calculateTDEE = (bmr: number, activityLevel: string): number => {
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,      // 久坐
      light: 1.375,        // 轻度活动
      moderate: 1.55,      // 中度活动
      active: 1.725,       // 高度活动
      veryActive: 1.9      // 极高活动
    };

    const multiplier = activityMultipliers[activityLevel] || 1.55;
    return bmr * multiplier;
  };

  return {
    // 状态
    isLoading,
    error,
    
    // 计算属性
    plans,
    currentPlan,
    hasPlan,
    
    // 方法
    generatePlan,
    getPlans,
    getPlanDetail,
    setCurrentPlan,
    deletePlan,
    clearPlans,
    refreshPlans,
    calculateBMR,
    calculateTDEE
  };
};

export default useNutrition;
