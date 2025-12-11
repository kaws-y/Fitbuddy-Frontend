/**
 * useTraining Composable
 * 训练计划相关的可复用逻辑
 * Requirements: 2.3
 */

import { ref, computed } from 'vue';
import { useTrainingStore } from '@/stores/trainingStore';
import * as trainingApi from '@/api/training';
import type { TrainingPlan } from '@/types';
import { logger } from '@/utils/logger';

export const useTraining = () => {
  const trainingStore = useTrainingStore();
  
  // 状态
  const isLoading = ref(false);
  const error = ref<string>('');

  // 计算属性
  const plans = computed(() => trainingStore.plans);
  const currentPlan = computed(() => trainingStore.currentPlan);
  const hasPlan = computed(() => trainingStore.plans.length > 0);

  /**
   * 生成训练计划
   */
  const generatePlan = async (planData: {
    goal: string;
    level: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    equipment?: string[];
    daysPerWeek?: number;
  }): Promise<TrainingPlan | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Generating training plan', { goal: planData.goal, level: planData.level });

      // 显示加载提示
      uni.showLoading({
        title: '正在生成训练计划...',
        mask: true
      });

      // 调用 API 生成计划
      const plan = await trainingApi.createTrainingPlan(planData);

      // 添加到 store
      trainingStore.addPlan(plan);
      trainingStore.setCurrentPlan(plan);

      // 隐藏加载提示
      uni.hideLoading();

      // 显示成功提示
      uni.showToast({
        title: '训练计划生成成功',
        icon: 'success',
        duration: 2000
      });

      logger.info('Training plan generated successfully', { planId: plan.id });

      return plan;
    } catch (err: any) {
      logger.error('Failed to generate training plan', err);
      error.value = err.message || '生成训练计划失败';
      
      // 隐藏加载提示
      uni.hideLoading();
      
      // 错误提示已在 request 工具中处理
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取训练计划列表
   */
  const getPlans = async (): Promise<TrainingPlan[]> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Fetching training plans');

      // 调用 API 获取计划列表
      const planList = await trainingApi.getTrainingPlans();

      // 更新 store
      trainingStore.setPlans(planList);

      logger.info('Training plans fetched successfully', { count: planList.length });

      return planList;
    } catch (err: any) {
      logger.error('Failed to fetch training plans', err);
      error.value = err.message || '获取训练计划失败';
      
      // 错误提示已在 request 工具中处理
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取训练计划详情
   */
  const getPlanDetail = async (planId: string): Promise<TrainingPlan | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Fetching training plan detail', { planId });

      // 调用 API 获取计划详情
      const plan = await trainingApi.getTrainingPlan(planId);

      // 设置为当前计划
      trainingStore.setCurrentPlan(plan);

      logger.info('Training plan detail fetched successfully', { planId });

      return plan;
    } catch (err: any) {
      logger.error('Failed to fetch training plan detail', err);
      error.value = err.message || '获取训练计划详情失败';
      
      // 错误提示已在 request 工具中处理
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 设置当前训练计划
   */
  const setCurrentPlan = (plan: TrainingPlan | null) => {
    trainingStore.setCurrentPlan(plan);
  };

  /**
   * 删除训练计划
   */
  const deletePlan = (planId: string) => {
    trainingStore.deletePlan(planId);
    
    uni.showToast({
      title: '训练计划已删除',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 清空所有训练计划
   */
  const clearPlans = () => {
    trainingStore.clearPlans();
    
    uni.showToast({
      title: '所有训练计划已清空',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 刷新训练计划列表
   */
  const refreshPlans = async (): Promise<void> => {
    await getPlans();
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
    refreshPlans
  };
};

export default useTraining;
