// 用户相关类型
export interface User {
  id: string
  username: string
  email: string
  profile: UserProfile
}

export interface UserProfile {
  age?: number
  gender?: string
  weight?: number
  height?: number
  goal?: string
  fitnessLevel?: string
}

// 认证相关类型
export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  profile?: UserProfile
}

export interface AuthResponse {
  user: User
  token: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

// 聊天相关类型
export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatRequest {
  message: string
  sessionId: string
  stream?: boolean
}

export interface ChatResponse {
  type: string
  content: string
  title?: string
  suggestions?: string[]
  metadata?: Record<string, any>
}

// 训练计划相关类型
export interface TrainingPlan {
  id: string
  userId: string
  goal: string
  level: string
  planData: TrainingPlanData
  createdAt: string
}

export interface TrainingPlanData {
  profile: any
  trainingSchedule: DayPlan[]
  nutritionPlan: any
  milestones: any[]
  aiAdvice: string
}

export interface DayPlan {
  day: number
  name: string
  duration: number
  exercises: Exercise[]
  warmup: any
  cooldown: any
}

export interface Exercise {
  type: string
  name: string
  sets?: number
  reps?: string
  duration?: string
  rest?: string
  notes?: string
}

// 营养计划相关类型
export interface NutritionPlan {
  id: string
  userId: string
  goal: string
  planData: NutritionPlanData
  createdAt: string
}

export interface NutritionPlanData {
  bmr: number
  tdee: number
  targetCalories: number
  macros: Macros
  mealTiming: string[]
  recommendations: string[]
}

export interface Macros {
  protein: number
  carbs: number
  fats: number
}

// 进度跟踪相关类型
export interface ProgressRecord {
  id: string
  userId: string
  date: string
  weight?: number
  bodyFat?: number
  measurements?: Record<string, number>
  photos?: Record<string, string>
  notes?: string
  createdAt: string
}
