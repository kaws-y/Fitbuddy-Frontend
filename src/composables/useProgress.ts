/**
 * useProgress Composable
 * 进度跟踪相关的可复用逻辑
 * Requirements: 2.3
 */

import { ref, computed } from 'vue';
import { useProgressStore } from '@/stores/progressStore';
import * as progressApi from '@/api/progress';
import type { ProgressRecord } from '@/types';
import { logger } from '@/utils/logger';

export const useProgress = () => {
  const progressStore = useProgressStore();
  
  // 状态
  const isLoading = ref(false);
  const error = ref<string>('');

  // 计算属性
  const records = computed(() => progressStore.records);
  const hasRecords = computed(() => progressStore.records.length > 0);
  const latestRecord = computed(() => 
    progressStore.records.length > 0 
      ? progressStore.records[progressStore.records.length - 1] 
      : null
  );

  /**
   * 记录进度
   */
  const recordProgress = async (progressData: {
    date: string;
    weight?: number;
    bodyFat?: number;
    measurements?: Record<string, number>;
    photos?: Record<string, string>;
    notes?: string;
  }): Promise<ProgressRecord | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Recording progress', { date: progressData.date });

      // 显示加载提示
      uni.showLoading({
        title: '正在保存进度...',
        mask: true
      });

      // 调用 API 记录进度
      const record = await progressApi.recordProgress(progressData);

      // 添加到 store
      progressStore.addRecord(record);

      // 隐藏加载提示
      uni.hideLoading();

      // 显示成功提示
      uni.showToast({
        title: '进度记录成功',
        icon: 'success',
        duration: 2000
      });

      logger.info('Progress recorded successfully', { recordId: record.id });

      return record;
    } catch (err: any) {
      logger.error('Failed to record progress', err);
      error.value = err.message || '记录进度失败';
      
      // 隐藏加载提示
      uni.hideLoading();
      
      // 错误提示已在 request 工具中处理
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取进度历史
   */
  const getHistory = async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ProgressRecord[]> => {
    try {
      isLoading.value = true;
      error.value = '';

      logger.info('Fetching progress history', params);

      // 调用 API 获取历史记录
      const recordList = await progressApi.getProgressHistory(params);

      // 更新 store
      progressStore.setRecords(recordList);

      logger.info('Progress history fetched successfully', { count: recordList.length });

      return recordList;
    } catch (err: any) {
      logger.error('Failed to fetch progress history', err);
      error.value = err.message || '获取进度历史失败';
      
      // 错误提示已在 request 工具中处理
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 获取指定日期范围的进度记录
   */
  const getRecordsByDateRange = async (
    startDate: string,
    endDate: string
  ): Promise<ProgressRecord[]> => {
    return getHistory({ startDate, endDate });
  };

  /**
   * 删除进度记录
   */
  const deleteRecord = (recordId: string) => {
    progressStore.deleteRecord(recordId);
    
    uni.showToast({
      title: '进度记录已删除',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 清空所有进度记录
   */
  const clearRecords = () => {
    progressStore.clearRecords();
    
    uni.showToast({
      title: '所有进度记录已清空',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 刷新进度历史
   */
  const refreshHistory = async (): Promise<void> => {
    await getHistory();
  };

  /**
   * 计算体重变化
   */
  const calculateWeightChange = (): {
    change: number;
    percentage: number;
  } | null => {
    if (progressStore.records.length < 2) {
      return null;
    }

    const sortedRecords = [...progressStore.records]
      .filter(r => r.weight !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedRecords.length < 2) {
      return null;
    }

    const firstRecord = sortedRecords[0];
    const lastRecord = sortedRecords[sortedRecords.length - 1];

    const change = (lastRecord.weight || 0) - (firstRecord.weight || 0);
    const percentage = ((change / (firstRecord.weight || 1)) * 100);

    return {
      change: parseFloat(change.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(2))
    };
  };

  /**
   * 计算体脂率变化
   */
  const calculateBodyFatChange = (): {
    change: number;
    percentage: number;
  } | null => {
    if (progressStore.records.length < 2) {
      return null;
    }

    const sortedRecords = [...progressStore.records]
      .filter(r => r.bodyFat !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedRecords.length < 2) {
      return null;
    }

    const firstRecord = sortedRecords[0];
    const lastRecord = sortedRecords[sortedRecords.length - 1];

    const change = (lastRecord.bodyFat || 0) - (firstRecord.bodyFat || 0);
    const percentage = ((change / (firstRecord.bodyFat || 1)) * 100);

    return {
      change: parseFloat(change.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(2))
    };
  };

  /**
   * 获取最新的体重
   */
  const getLatestWeight = (): number | null => {
    const recordsWithWeight = progressStore.records
      .filter(r => r.weight !== undefined)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return recordsWithWeight.length > 0 ? recordsWithWeight[0].weight || null : null;
  };

  /**
   * 获取最新的体脂率
   */
  const getLatestBodyFat = (): number | null => {
    const recordsWithBodyFat = progressStore.records
      .filter(r => r.bodyFat !== undefined)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return recordsWithBodyFat.length > 0 ? recordsWithBodyFat[0].bodyFat || null : null;
  };

  /**
   * 获取进度统计数据
   */
  const getStatistics = () => {
    return {
      totalRecords: progressStore.records.length,
      weightChange: calculateWeightChange(),
      bodyFatChange: calculateBodyFatChange(),
      latestWeight: getLatestWeight(),
      latestBodyFat: getLatestBodyFat()
    };
  };

  return {
    // 状态
    isLoading,
    error,
    
    // 计算属性
    records,
    hasRecords,
    latestRecord,
    
    // 方法
    recordProgress,
    getHistory,
    getRecordsByDateRange,
    deleteRecord,
    clearRecords,
    refreshHistory,
    calculateWeightChange,
    calculateBodyFatChange,
    getLatestWeight,
    getLatestBodyFat,
    getStatistics
  };
};

export default useProgress;
