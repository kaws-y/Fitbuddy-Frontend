# 通用 UI 组件

本目录包含 FitBuddy Pro 前端应用的可复用 UI 组件。

## 组件列表

### LoadingIndicator
加载指示器组件，用于显示加载状态。

**Props:**
- `visible` (boolean, 默认: true) - 是否显示加载指示器
- `text` (string, 默认: '加载中...') - 加载提示文本

**使用示例:**
```vue
<LoadingIndicator :visible="isLoading" text="正在加载数据..." />
```

### ErrorMessage
错误消息组件，用于显示错误信息并提供重试选项。

**Props:**
- `visible` (boolean, 默认: true) - 是否显示错误消息
- `title` (string, 默认: '出错了') - 错误标题
- `message` (string, 必填) - 错误消息内容
- `showRetry` (boolean, 默认: false) - 是否显示重试按钮
- `retryText` (string, 默认: '重试') - 重试按钮文本
- `closeText` (string, 默认: '关闭') - 关闭按钮文本

**Events:**
- `retry` - 点击重试按钮时触发
- `close` - 点击关闭按钮时触发

**使用示例:**
```vue
<ErrorMessage
  :visible="hasError"
  message="网络连接失败"
  :showRetry="true"
  @retry="handleRetry"
  @close="handleClose"
/>
```

### ChatMessage
聊天消息组件，用于显示用户和助手的消息。

**Props:**
- `message` (ChatMessage, 必填) - 消息对象
  - `id` (string) - 消息 ID
  - `type` ('user' | 'assistant') - 消息类型
  - `content` (string) - 消息内容
  - `timestamp` (string) - 时间戳
  - `suggestions` (string[], 可选) - 建议按钮列表
  - `streaming` (boolean, 可选) - 是否为流式消息

**Events:**
- `suggestionClick` - 点击建议按钮时触发，参数为建议文本

**使用示例:**
```vue
<ChatMessage
  :message="message"
  @suggestionClick="handleSuggestionClick"
/>
```

**特性:**
- 支持用户消息和助手消息的不同样式
- 支持流式更新（实时显示正在生成的内容）
- 支持建议按钮（快速回复选项）
- 自动格式化时间戳

## 导入方式

```typescript
// 导入单个组件
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ChatMessage from '@/components/ChatMessage.vue'

// 或从 index 文件导入
import { LoadingIndicator, ErrorMessage, ChatMessage } from '@/components'
```

## 设计规范

所有组件遵循以下设计规范：
- 使用 uni-app 的 rpx 单位实现响应式布局
- 主色调：#007aff（蓝色）
- 圆角：16rpx（卡片）、40rpx（按钮）
- 字体大小：22rpx（小）、26-28rpx（正常）、32rpx（标题）
- 间距：20-30rpx（小）、40-60rpx（中）、80rpx（大）
