import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ProgressRecord } from '../types'

/**
 * 进度跟踪状态管理 Store
 * 管理进度记录列表和统计数据
 * Requirements: 2.3
 */
export const useProgressStore = defineStore('progress', () => {
  // 状态
  const records = ref<ProgressRecord[]>([])
  const isLoading = ref<boolean>(false)

  // 计算属性
  const recordCount = computed(() => records.value.length)
  const hasRecords = computed(() => records.value.length > 0)
  
  /**
   * 获取按日期排序的记录列表（最新的在前）
   */
  const sortedRecords = computed(() => {
    return [...records.value].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })

  /**
   * 最新的进度记录
   */
  const latestRecord = computed(() => {
    return sortedRecords.value.length > 0 ? sortedRecords.value[0] : null
  })

  /**
   * 最新的体重
   */
  const latestWeight = computed(() => {
    return latestRecord.value?.weight || null
  })

  /**
   * 最新的体脂率
   */
  const latestBodyFat = computed(() => {
    return latestRecord.value?.bodyFat || null
  })

  /**
   * 体重变化趋势（最近 30 天）
   */
  const weightTrend = computed(() => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return records.value
      .filter(r => r.weight && new Date(r.date) >= thirtyDaysAgo)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(r => ({
        date: r.date,
        weight: r.weight
      }))
  })

  /**
   * 体脂率变化趋势（最近 30 天）
   */
  const bodyFatTrend = computed(() => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    return records.value
      .filter(r => r.bodyFat && new Date(r.date) >= thirtyDaysAgo)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(r => ({
        date: r.date,
        bodyFat: r.bodyFat
      }))
  })

  /**
   * 统计数据
   */
  const statistics = computed(() => {
    if (records.value.length === 0) {
      return null
    }

    const weightsWithValues = records.value.filter(r => r.weight)
    const bodyFatsWithValues = records.value.filter(r => r.bodyFat)

    let weightChange = null
    let bodyFatChange = null

    if (weightsWithValues.length >= 2) {
      const sorted = [...weightsWithValues].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      const first = sorted[0].weight!
      const last = sorted[sorted.length - 1].weight!
      weightChange = last - first
    }

    if (bodyFatsWithValues.length >= 2) {
      const sorted = [...bodyFatsWithValues].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      const first = sorted[0].bodyFat!
      const last = sorted[sorted.length - 1].bodyFat!
      bodyFatChange = last - first
    }

    return {
      totalRecords: records.value.length,
      latestWeight: latestWeight.value,
      latestBodyFat: latestBodyFat.value,
      weightChange,
      bodyFatChange,
      recordsWithWeight: weightsWithValues.length,
      recordsWithBodyFat: bodyFatsWithValues.length
    }
  })

  /**
   * 设置进度记录列表
   */
  function setRecords(recordList: ProgressRecord[]) {
    records.value = recordList
  }

  /**
   * 添加进度记录
   */
  function addRecord(record: ProgressRecord) {
    // 检查是否已存在
    const existingIndex = records.value.findIndex(r => r.id === record.id)
    if (existingIndex !== -1) {
      // 更新现有记录
      records.value[existingIndex] = record
    } else {
      // 添加新记录
      records.value.push(record)
    }
    
    // 保存到本地存储
    saveRecords()
  }

  /**
   * 更新进度记录
   */
  function updateRecord(recordId: string, updates: Partial<ProgressRecord>) {
    const index = records.value.findIndex(r => r.id === recordId)
    if (index !== -1) {
      records.value[index] = { ...records.value[index], ...updates }
      
      // 保存到本地存储
      saveRecords()
    }
  }

  /**
   * 删除进度记录
   */
  function deleteRecord(recordId: string) {
    const index = records.value.findIndex(r => r.id === recordId)
    if (index !== -1) {
      records.value.splice(index, 1)
      
      // 保存到本地存储
      saveRecords()
    }
  }

  /**
   * 根据 ID 获取进度记录
   */
  function getRecordById(recordId: string): ProgressRecord | undefined {
    return records.value.find(r => r.id === recordId)
  }

  /**
   * 根据日期获取进度记录
   */
  function getRecordByDate(date: string): ProgressRecord | undefined {
    return records.value.find(r => r.date === date)
  }

  /**
   * 获取日期范围内的记录
   */
  function getRecordsByDateRange(startDate: string, endDate: string): ProgressRecord[] {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    return records.value.filter(r => {
      const recordDate = new Date(r.date)
      return recordDate >= start && recordDate <= end
    })
  }

  /**
   * 清空所有进度记录
   */
  function clearRecords() {
    records.value = []
    
    // 清除本地存储
    try {
      uni.removeStorageSync('progressRecords')
    } catch (error) {
      console.error('Failed to clear records from storage:', error)
    }
  }

  /**
   * 设置 loading 状态
   */
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  /**
   * 从本地存储恢复进度记录
   */
  function restoreRecords() {
    try {
      const storedRecords = uni.getStorageSync('progressRecords')
      
      if (storedRecords) {
        records.value = JSON.parse(storedRecords)
      }
    } catch (error) {
      console.error('Failed to restore records from storage:', error)
    }
  }

  /**
   * 保存进度记录到本地存储
   */
  function saveRecords() {
    try {
      uni.setStorageSync('progressRecords', JSON.stringify(records.value))
    } catch (error) {
      console.error('Failed to save records to storage:', error)
    }
  }

  return {
    // 状态
    records,
    isLoading,
    
    // 计算属性
    recordCount,
    hasRecords,
    sortedRecords,
    latestRecord,
    latestWeight,
    latestBodyFat,
    weightTrend,
    bodyFatTrend,
    statistics,
    
    // 方法
    setRecords,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    getRecordByDate,
    getRecordsByDateRange,
    clearRecords,
    setLoading,
    restoreRecords,
    saveRecords
  }
})
