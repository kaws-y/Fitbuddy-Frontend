<template>
  <view :class="['message-container', `message-${message.type}`]">
    <view class="message-bubble">
      <!-- 消息内容 -->
      <view class="message-content">
        <text class="message-text">{{ displayContent }}</text>
      </view>
      
      <!-- 建议按钮 -->
      <view v-if="message.suggestions && message.suggestions.length > 0" class="suggestions-container">
        <button
          v-for="(suggestion, index) in message.suggestions"
          :key="index"
          class="suggestion-button"
          @click="handleSuggestionClick(suggestion)"
        >
          {{ suggestion }}
        </button>
      </view>
      
      <!-- 时间戳 -->
      <text class="message-timestamp">{{ formattedTime }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, watch } from 'vue'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
  streaming?: boolean
}

interface Props {
  message: ChatMessage
}

const props = defineProps<Props>()

const emit = defineEmits<{
  suggestionClick: [suggestion: string]
}>()

// 用于流式更新的显示内容
const displayContent = ref(props.message.content)

// 监听消息内容变化（用于流式更新）
watch(
  () => props.message.content,
  (newContent) => {
    displayContent.value = newContent
  }
)

// 格式化时间戳
const formattedTime = computed(() => {
  const date = new Date(props.message.timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

// 处理建议按钮点击
const handleSuggestionClick = (suggestion: string) => {
  emit('suggestionClick', suggestion)
}
</script>

<style scoped>
.message-container {
  display: flex;
  margin-bottom: 30rpx;
  padding: 0 30rpx;
}

.message-user {
  justify-content: flex-end;
}

.message-assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.message-user .message-bubble {
  align-items: flex-end;
}

.message-assistant .message-bubble {
  align-items: flex-start;
}

.message-content {
  padding: 24rpx 32rpx;
  border-radius: 16rpx;
  word-wrap: break-word;
  word-break: break-word;
}

.message-user .message-content {
  background-color: #007aff;
  color: #ffffff;
  border-bottom-right-radius: 4rpx;
}

.message-assistant .message-content {
  background-color: #f5f5f5;
  color: #333333;
  border-bottom-left-radius: 4rpx;
}

.message-text {
  font-size: 28rpx;
  line-height: 1.6;
  white-space: pre-wrap;
}

.suggestions-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 20rpx;
  width: 100%;
}

.suggestion-button {
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  border: 2rpx solid #007aff;
  border-radius: 40rpx;
  color: #007aff;
  font-size: 26rpx;
  text-align: center;
}

.suggestion-button:active {
  background-color: #f0f8ff;
}

.message-timestamp {
  font-size: 22rpx;
  color: #999999;
  margin-top: 10rpx;
}

.message-user .message-timestamp {
  text-align: right;
}

.message-assistant .message-timestamp {
  text-align: left;
}
</style>
