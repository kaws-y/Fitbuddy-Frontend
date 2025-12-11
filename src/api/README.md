# API 模块

本目录包含所有与后端 API 交互的模块。每个模块对应一个业务领域。

## 模块列表

### auth.ts
认证相关 API：
- `register(data)` - 用户注册
- `login(data)` - 用户登录

### chat.ts
聊天相关 API：
- `sendMessage(data)` - 发送聊天消息（标准模式）
- `sendMessageStream(data)` - 发送聊天消息（流式模式）

### training.ts
训练计划相关 API：
- `createTrainingPlan(data)` - 创建训练计划
- `getTrainingPlans()` - 获取训练计划列表
- `getTrainingPlan(id)` - 获取训练计划详情

### nutrition.ts
营养计划相关 API：
- `createNutritionPlan(data)` - 创建营养计划
- `getNutritionPlans()` - 获取营养计划列表
- `getNutritionPlan(id)` - 获取营养计划详情

### progress.ts
进度跟踪相关 API：
- `recordProgress(data)` - 记录进度
- `getProgressHistory(params)` - 获取进度历史

### user.ts
用户相关 API：
- `getUserProfile()` - 获取用户资料
- `updateUserProfile(data)` - 更新用户资料

## 使用示例

```typescript
import { login, register } from '@/api/auth';
import { sendMessage } from '@/api/chat';
import { createTrainingPlan } from '@/api/training';

// 登录
const authResponse = await login({
  username: 'testuser',
  password: 'password123'
});

// 发送聊天消息
const chatResponse = await sendMessage({
  message: '你好',
  sessionId: 'session-123'
});

// 创建训练计划
const plan = await createTrainingPlan({
  goal: 'fat_loss',
  level: 'beginner'
});
```

## 注意事项

1. 所有 API 方法都返回 Promise
2. 错误处理已在 `request.ts` 中统一处理
3. 认证令牌会自动添加到请求头
4. 加载状态会自动显示（可通过 `showLoading: false` 禁用）
