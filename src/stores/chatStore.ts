import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage } from '../types'
import { v4 as uuidv4 } from '../utils'

/**
 * 聊天状态管理 Store
 * 管理聊天消息列表、会话 ID 和 loading 状态
 * Requirements: 2.3
 */
export const useChatStore = defineStore('chat', () => {
  // 状态
  const messages = ref<ChatMessage[]>([])
  const sessionId = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isStreaming = ref<boolean>(false)
  const currentStreamingMessage = ref<string>('')

  // 计算属性
  const messageCount = computed(() => messages.value.length)
  const hasMessages = computed(() => messages.value.length > 0)
  const lastMessage = computed(() => 
    messages.value.length > 0 ? messages.value[messages.value.length - 1] : null
  )

  /**
   * 初始化会话 ID
   */
  function initSession() {
    if (!sessionId.value) {
      sessionId.value = generateSessionId()
    }
  }

  /**
   * 生成新的会话 ID
   */
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 重置会话（开始新对话）
   */
  function resetSession() {
    messages.value = []
    sessionId.value = generateSessionId()
    isLoading.value = false
    isStreaming.value = false
    currentStreamingMessage.value = ''
  }

  /**
   * 添加用户消息
   */
  function addUserMessage(content: string): ChatMessage {
    const message: ChatMessage = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    messages.value.push(message)
    return message
  }

  /**
   * 添加助手消息
   */
  function addAssistantMessage(content: string): ChatMessage {
    const message: ChatMessage = {
      id: uuidv4(),
      type: 'assistant',
      content,
      timestamp: new Date().toISOString()
    }
    messages.value.push(message)
    return message
  }

  /**
   * 开始流式响应
   */
  function startStreaming() {
    isStreaming.value = true
    currentStreamingMessage.value = ''
    
    // 添加一个空的助手消息作为占位符
    const message: ChatMessage = {
      id: uuidv4(),
      type: 'assistant',
      content: '',
      timestamp: new Date().toISOString()
    }
    messages.value.push(message)
  }

  /**
   * 追加流式内容
   */
  function appendStreamContent(chunk: string) {
    currentStreamingMessage.value += chunk
    
    // 更新最后一条消息的内容
    if (messages.value.length > 0) {
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg.type === 'assistant') {
        lastMsg.content = currentStreamingMessage.value
      }
    }
  }

  /**
   * 结束流式响应
   */
  function endStreaming() {
    isStreaming.value = false
    currentStreamingMessage.value = ''
  }

  /**
   * 更新最后一条助手消息
   */
  function updateLastAssistantMessage(content: string) {
    for (let i = messages.value.length - 1; i >= 0; i--) {
      if (messages.value[i].type === 'assistant') {
        messages.value[i].content = content
        break
      }
    }
  }

  /**
   * 删除消息
   */
  function deleteMessage(messageId: string) {
    const index = messages.value.findIndex(msg => msg.id === messageId)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  /**
   * 清空所有消息
   */
  function clearMessages() {
    messages.value = []
  }

  /**
   * 设置 loading 状态
   */
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  /**
   * 从本地存储恢复聊天历史
   */
  function restoreChat() {
    try {
      const storedMessages = uni.getStorageSync('chatMessages')
      const storedSessionId = uni.getStorageSync('chatSessionId')
      
      if (storedMessages) {
        messages.value = JSON.parse(storedMessages)
      }
      if (storedSessionId) {
        sessionId.value = storedSessionId
      } else {
        initSession()
      }
    } catch (error) {
      console.error('Failed to restore chat from storage:', error)
      initSession()
    }
  }

  /**
   * 保存聊天历史到本地存储
   */
  function saveChat() {
    try {
      uni.setStorageSync('chatMessages', JSON.stringify(messages.value))
      uni.setStorageSync('chatSessionId', sessionId.value)
    } catch (error) {
      console.error('Failed to save chat to storage:', error)
    }
  }

  return {
    // 状态
    messages,
    sessionId,
    isLoading,
    isStreaming,
    currentStreamingMessage,
    
    // 计算属性
    messageCount,
    hasMessages,
    lastMessage,
    
    // 方法
    initSession,
    generateSessionId,
    resetSession,
    addUserMessage,
    addAssistantMessage,
    startStreaming,
    appendStreamContent,
    endStreaming,
    updateLastAssistantMessage,
    deleteMessage,
    clearMessages,
    setLoading,
    restoreChat,
    saveChat
  }
})
