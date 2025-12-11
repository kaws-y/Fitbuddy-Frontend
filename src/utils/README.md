# 工具函数 (Utils)

本目录包含前端应用的通用工具函数和辅助模块。

## 模块说明

### request.ts
封装 `uni.request` 的 HTTP 请求工具，提供：
- 统一的 API 调用接口
- 自动添加认证令牌
- 统一的错误处理
- 加载状态管理
- 文件上传支持

**使用示例：**
```typescript
import { get, post } from '@/utils/request';

// GET 请求
const user = await get('/user/profile');

// POST 请求
const result = await post('/auth/login', {
  username: 'test',
  password: '123456'
});
```

### logger.ts
日志记录工具，提供：
- 统一的日志接口
- 开发/生产环境区分
- 错误监控集成准备

**使用示例：**
```typescript
import logger from '@/utils/logger';

logger.debug('调试信息', data);
logger.info('普通信息');
logger.warn('警告信息');
logger.error('错误信息', error);
```

### retry.ts
请求重试工具，提供：
- 指数退避重试策略
- 可配置的重试次数和延迟
- 智能的重试判断

**使用示例：**
```typescript
import retryRequest from '@/utils/retry';

const data = await retryRequest(
  () => get('/api/data'),
  { maxRetries: 3, baseDelay: 1000 }
);
```

### constants.ts
应用常量定义，包括：
- 存储键名
- 健身目标和水平
- 错误码
- 页面路径

**使用示例：**
```typescript
import { STORAGE_KEYS, FITNESS_GOALS } from '@/utils/constants';

uni.setStorageSync(STORAGE_KEYS.TOKEN, token);
const goal = FITNESS_GOALS.FAT_LOSS;
```

## 最佳实践

1. **统一使用 request 工具**：所有 API 调用都应使用 `request.ts` 中的方法
2. **合理使用日志**：开发时使用 `logger.debug`，生产环境使用 `logger.error`
3. **网络容错**：对于重要的网络请求，考虑使用 `retryRequest`
4. **使用常量**：避免硬编码，使用 `constants.ts` 中定义的常量
