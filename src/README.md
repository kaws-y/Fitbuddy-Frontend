# FitBuddy Pro 前端项目结构

本文档描述了 FitBuddy Pro uni-app 前端项目的目录结构和组织方式。

## 目录结构

```
src/
├── api/              # API 调用模块
│   └── .gitkeep
├── components/       # 可复用 Vue 组件
│   └── .gitkeep
├── composables/      # Vue 3 Composition API 可复用逻辑
│   └── .gitkeep
├── pages/            # 页面组件
│   ├── auth/         # 认证相关页面（登录、注册）
│   ├── index/        # 首页/聊天页面
│   ├── nutrition/    # 营养计划页面
│   ├── progress/     # 进度跟踪页面
│   ├── training/     # 训练计划页面
│   └── user/         # 用户资料页面
├── static/           # 静态资源
│   └── tabbar/       # 底部导航栏图标
├── stores/           # Pinia 状态管理
│   └── .gitkeep
├── types/            # TypeScript 类型定义
│   └── index.ts
├── utils/            # 工具函数
│   ├── constants.ts  # 常量定义
│   ├── logger.ts     # 日志工具
│   ├── request.ts    # HTTP 请求封装
│   ├── retry.ts      # 重试工具
│   └── index.ts      # 统一导出
├── App.vue           # 根组件
├── main.ts           # 应用入口
├── pages.json        # 页面配置
├── manifest.json     # 应用配置
└── env.d.ts          # 环境变量类型声明
```

## 各目录说明

### api/
存放 API 调用相关的模块，每个模块对应一个业务领域：
- `auth.ts` - 认证相关 API
- `chat.ts` - 聊天相关 API
- `training.ts` - 训练计划相关 API
- `nutrition.ts` - 营养计划相关 API
- `progress.ts` - 进度跟踪相关 API

### components/
存放可复用的 Vue 组件：
- `ChatMessage.vue` - 聊天消息气泡
- `TrainingCard.vue` - 训练计划卡片
- `ExerciseItem.vue` - 训练动作项
- `NutritionCard.vue` - 营养计划卡片
- `ProgressChart.vue` - 进度图表
- `LoadingIndicator.vue` - 加载指示器
- `ErrorMessage.vue` - 错误消息组件

### composables/
存放 Vue 3 Composition API 可复用逻辑：
- `useAuth.ts` - 认证状态管理
- `useChat.ts` - 聊天功能
- `useTraining.ts` - 训练计划管理
- `useNutrition.ts` - 营养计划管理
- `useProgress.ts` - 进度跟踪

### pages/
存放页面组件，每个页面对应一个路由：
- `auth/login.vue` - 登录页
- `auth/register.vue` - 注册页
- `index/index.vue` - 首页/聊天页
- `training/plans.vue` - 训练计划列表
- `nutrition/plans.vue` - 营养计划列表
- `progress/tracking.vue` - 进度跟踪
- `user/profile.vue` - 用户资料

### stores/
存放 Pinia 状态管理模块：
- `userStore.ts` - 用户状态
- `chatStore.ts` - 聊天状态
- `trainingStore.ts` - 训练计划状态
- `nutritionStore.ts` - 营养计划状态
- `progressStore.ts` - 进度状态

### types/
存放 TypeScript 类型定义，包括：
- API 请求/响应类型
- 数据模型类型
- 组件 Props 类型

### utils/
存放工具函数和辅助模块：
- `request.ts` - HTTP 请求封装
- `logger.ts` - 日志工具
- `retry.ts` - 重试工具
- `constants.ts` - 常量定义

## 开发规范

### 命名规范
- **文件名**：使用 camelCase（如 `userStore.ts`）或 kebab-case（如 `chat-message.vue`）
- **组件名**：使用 PascalCase（如 `ChatMessage`）
- **函数名**：使用 camelCase（如 `getUserProfile`）
- **常量名**：使用 UPPER_SNAKE_CASE（如 `API_BASE_URL`）

### 导入顺序
1. Vue 相关导入
2. 第三方库导入
3. 项目内部导入（按字母顺序）
4. 类型导入

```typescript
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { get, post } from '@/utils/request';
import type { User, AuthResponse } from '@/types';
```

### 组件结构
使用 Vue 3 Composition API 和 `<script setup>` 语法：

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { User } from '@/types';

// Props
const props = defineProps<{
  user: User;
}>();

// Emits
const emit = defineEmits<{
  update: [user: User];
}>();

// State
const loading = ref(false);

// Computed
const displayName = computed(() => props.user.username);

// Methods
const handleUpdate = () => {
  emit('update', props.user);
};

// Lifecycle
onMounted(() => {
  // 初始化逻辑
});
</script>

<template>
  <view class="container">
    <!-- 模板内容 -->
  </view>
</template>

<style scoped>
.container {
  /* 样式 */
}
</style>
```

### 状态管理
使用 Pinia 进行状态管理：

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string>('');

  // Getters
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
    uni.setStorageSync('token', newToken);
  };

  const logout = () => {
    user.value = null;
    token.value = '';
    uni.removeStorageSync('token');
  };

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout
  };
});
```

## 环境配置

### 开发环境 (.env.development)
```
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_TITLE=FitBuddy Pro (Dev)
```

### 生产环境 (.env.production)
```
VITE_API_BASE_URL=https://api.fitbuddy.com/api
VITE_APP_TITLE=FitBuddy Pro
```

### 使用环境变量
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## 构建和运行

### 开发模式
```bash
# H5
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin

# App
npm run dev:app
```

### 生产构建
```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin

# Android
npm run build:app-android

# iOS
npm run build:app-ios
```

## 最佳实践

1. **组件化**：将可复用的 UI 拆分为独立组件
2. **类型安全**：充分利用 TypeScript 类型系统
3. **状态管理**：使用 Pinia 管理全局状态
4. **错误处理**：统一使用 request 工具处理 API 错误
5. **代码复用**：使用 composables 提取可复用逻辑
6. **性能优化**：合理使用 computed、watch 和懒加载
7. **跨平台兼容**：使用 uni-app 提供的跨平台 API
