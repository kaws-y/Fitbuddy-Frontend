/**
 * 应用常量定义
 */

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SESSION_ID: 'sessionId'
} as const;

// 健身目标
export const FITNESS_GOALS = {
  FAT_LOSS: 'fat_loss',
  MUSCLE_GAIN: 'muscle_gain',
  BODY_SHAPING: 'body_shaping',
  HEALTH_MAINTENANCE: 'health_maintenance',
  ENDURANCE: 'endurance'
} as const;

// 健身目标显示名称
export const FITNESS_GOAL_LABELS: Record<string, string> = {
  [FITNESS_GOALS.FAT_LOSS]: '减脂',
  [FITNESS_GOALS.MUSCLE_GAIN]: '增肌',
  [FITNESS_GOALS.BODY_SHAPING]: '塑形',
  [FITNESS_GOALS.HEALTH_MAINTENANCE]: '健康维持',
  [FITNESS_GOALS.ENDURANCE]: '体能提升'
};

// 健身水平
export const FITNESS_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

// 健身水平显示名称
export const FITNESS_LEVEL_LABELS: Record<string, string> = {
  [FITNESS_LEVELS.BEGINNER]: '初级',
  [FITNESS_LEVELS.INTERMEDIATE]: '中级',
  [FITNESS_LEVELS.ADVANCED]: '高级'
};

// 性别
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female'
} as const;

// 性别显示名称
export const GENDER_LABELS: Record<string, string> = {
  [GENDERS.MALE]: '男',
  [GENDERS.FEMALE]: '女'
};

// 消息类型
export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant'
} as const;

// API 错误码
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  USER_EXISTS: 'USER_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const;

// 页面路径
export const PAGE_PATHS = {
  INDEX: '/pages/index/index',
  LOGIN: '/pages/auth/login',
  REGISTER: '/pages/auth/register',
  TRAINING_PLANS: '/pages/training/plans',
  NUTRITION_PLANS: '/pages/nutrition/plans',
  PROGRESS_TRACKING: '/pages/progress/tracking',
  USER_PROFILE: '/pages/user/profile'
} as const;

export default {
  STORAGE_KEYS,
  FITNESS_GOALS,
  FITNESS_GOAL_LABELS,
  FITNESS_LEVELS,
  FITNESS_LEVEL_LABELS,
  GENDERS,
  GENDER_LABELS,
  MESSAGE_TYPES,
  ERROR_CODES,
  PAGE_PATHS
};
