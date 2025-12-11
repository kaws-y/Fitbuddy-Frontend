import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TrainingPlan } from '../types'

/**
 * 训练计划状态管理 Store
 * 管理训练计划列表和当前训练计划
 * Requirements: 2.3
 */
export const useTrainingStore = defineStore('training', () => {
  // 状态
  const plans = ref<TrainingPlan[]>([])
  const currentPlan = ref<TrainingPlan | null>(null)
  const isLoading = ref<boolean>(false)

  // 计算属性
  const planCount = computed(() => plans.value.length)
  const hasPlans = computed(() => plans.value.length > 0)
  const currentPlanId = computed(() => currentPlan.value?.id || '')
  
  /**
   * 获取按日期排序的计划列表（最新的在前）
   */
  const sortedPlans = computed(() => {
    return [...plans.value].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  })

  /**
   * 按目标分组的计划
   */
  const plansByGoal = computed(() => {
    const grouped: Record<string, TrainingPlan[]> = {}
    plans.value.forEach(plan => {
      if (!grouped[plan.goal]) {
        grouped[plan.goal] = []
      }
      grouped[plan.goal].push(plan)
    })
    return grouped
  })

  /**
   * 设置训练计划列表
   */
  function setPlans(planList: TrainingPlan[]) {
    plans.value = planList
  }

  /**
   * 添加训练计划
   */
  function addPlan(plan: TrainingPlan) {
    // 检查是否已存在
    const existingIndex = plans.value.findIndex(p => p.id === plan.id)
    if (existingIndex !== -1) {
      // 更新现有计划
      plans.value[existingIndex] = plan
    } else {
      // 添加新计划
      plans.value.push(plan)
    }
    
    // 保存到本地存储
    savePlans()
  }

  /**
   * 更新训练计划
   */
  function updatePlan(planId: string, updates: Partial<TrainingPlan>) {
    const index = plans.value.findIndex(p => p.id === planId)
    if (index !== -1) {
      plans.value[index] = { ...plans.value[index], ...updates }
      
      // 如果更新的是当前计划，也更新 currentPlan
      if (currentPlan.value?.id === planId) {
        currentPlan.value = plans.value[index]
      }
      
      // 保存到本地存储
      savePlans()
    }
  }

  /**
   * 删除训练计划
   */
  function deletePlan(planId: string) {
    const index = plans.value.findIndex(p => p.id === planId)
    if (index !== -1) {
      plans.value.splice(index, 1)
      
      // 如果删除的是当前计划，清除 currentPlan
      if (currentPlan.value?.id === planId) {
        currentPlan.value = null
      }
      
      // 保存到本地存储
      savePlans()
    }
  }

  /**
   * 设置当前训练计划
   */
  function setCurrentPlan(plan: TrainingPlan | null) {
    currentPlan.value = plan
    
    // 保存到本地存储
    if (plan) {
      try {
        uni.setStorageSync('currentTrainingPlan', JSON.stringify(plan))
      } catch (error) {
        console.error('Failed to save current plan to storage:', error)
      }
    } else {
      try {
        uni.removeStorageSync('currentTrainingPlan')
      } catch (error) {
        console.error('Failed to remove current plan from storage:', error)
      }
    }
  }

  /**
   * 根据 ID 设置当前训练计划
   */
  function setCurrentPlanById(planId: string) {
    const plan = plans.value.find(p => p.id === planId)
    if (plan) {
      setCurrentPlan(plan)
    }
  }

  /**
   * 清除当前训练计划
   */
  function clearCurrentPlan() {
    setCurrentPlan(null)
  }

  /**
   * 根据 ID 获取训练计划
   */
  function getPlanById(planId: string): TrainingPlan | undefined {
    return plans.value.find(p => p.id === planId)
  }

  /**
   * 根据目标获取训练计划
   */
  function getPlansByGoal(goal: string): TrainingPlan[] {
    return plans.value.filter(p => p.goal === goal)
  }

  /**
   * 清空所有训练计划
   */
  function clearPlans() {
    plans.value = []
    currentPlan.value = null
    
    // 清除本地存储
    try {
      uni.removeStorageSync('trainingPlans')
      uni.removeStorageSync('currentTrainingPlan')
    } catch (error) {
      console.error('Failed to clear plans from storage:', error)
    }
  }

  /**
   * 设置 loading 状态
   */
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  /**
   * 从本地存储恢复训练计划
   */
  function restorePlans() {
    try {
      const storedPlans = uni.getStorageSync('trainingPlans')
      const storedCurrentPlan = uni.getStorageSync('currentTrainingPlan')
      
      if (storedPlans) {
        plans.value = JSON.parse(storedPlans)
      }
      if (storedCurrentPlan) {
        currentPlan.value = JSON.parse(storedCurrentPlan)
      }
    } catch (error) {
      console.error('Failed to restore plans from storage:', error)
    }
  }

  /**
   * 保存训练计划到本地存储
   */
  function savePlans() {
    try {
      uni.setStorageSync('trainingPlans', JSON.stringify(plans.value))
    } catch (error) {
      console.error('Failed to save plans to storage:', error)
    }
  }

  return {
    // 状态
    plans,
    currentPlan,
    isLoading,
    
    // 计算属性
    planCount,
    hasPlans,
    currentPlanId,
    sortedPlans,
    plansByGoal,
    
    // 方法
    setPlans,
    addPlan,
    updatePlan,
    deletePlan,
    setCurrentPlan,
    setCurrentPlanById,
    clearCurrentPlan,
    getPlanById,
    getPlansByGoal,
    clearPlans,
    setLoading,
    restorePlans,
    savePlans
  }
})
