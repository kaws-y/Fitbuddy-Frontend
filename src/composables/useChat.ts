/**
 * useChat Composable
 * 聊天功能的可复用逻辑
 * Requirements: 2.3
 */

import { ref, computed } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import * as chatApi from '@/api/chat';
import type { ChatRequest, ChatResponse } from '@/types';
import { logger } from '@/utils/logger';

// 获取 API 基础 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const useChat = () => {
  const chatStore = useChatStore();
  const userStore = useUserStore();
  
  // 状态
  const isLoading = ref(false);
  const error = ref<string>('');

  // 计算属性
  const messages = computed(() => chatStore.messages);
  const sessionId = computed(() => chatStore.sessionId);
  const isStreaming = computed(() => chatStore.isStreaming);

  /**
   * 初始化聊天会话
   */
  const initChat = () => {
    chatStore.initSession();
    chatStore.restoreChat();
  };

  /**
   * 发送消息（标准模式）
   */
  const sendMessage = async (message: string): Promise<ChatResponse | null> => {
    try {
      isLoading.value = true;
      error.value = '';

      // 确保有会话 ID
      if (!chatStore.sessionId) {
        chatStore.initSession();
      }

      logger.info('Sending message', { message, sessionId: chatStore.sessionId });

      // 添加用户消息到列表
      chatStore.addUserMessage(message);

      // 设置加载状态
      chatStore.setLoading(true);

      // 构建请求数据
      const requestData: ChatRequest = {
        message,
        sessionId: chatStore.sessionId,
        stream: false
      };

      // 发送请求
      const response = await chatApi.sendMessage(requestData);

      // 添加助手响应到列表
      chatStore.addAssistantMessage(response.content);

      // 保存聊天历史
      chatStore.saveChat();

      logger.info('Message sent successfully', { responseType: response.type });

      return response;
    } catch (err: any) {
      logger.error('Failed to send message', err);
      error.value = err.message || '发送消息失败';
      
      // 添加错误消息
      chatStore.addAssistantMessage('抱歉，我遇到了一些问题。请稍后再试。');
      
      return null;
    } finally {
      isLoading.value = false;
      chatStore.setLoading(false);
    }
  };

  /**
   * 发送消息（流式模式 - SSE）
   */
  const streamMessage = async (message: string): Promise<boolean> => {
    try {
      error.value = '';

      // 确保有会话 ID
      if (!chatStore.sessionId) {
        chatStore.initSession();
      }

      logger.info('Starting streaming message', { message, sessionId: chatStore.sessionId });

      // 添加用户消息到列表
      chatStore.addUserMessage(message);

      // 开始流式响应
      chatStore.startStreaming();

      // 获取 token
      const token = userStore.getToken();

      // 构建 SSE URL
      const url = `${API_BASE_URL}/chat/stream?message=${encodeURIComponent(message)}&sessionId=${encodeURIComponent(chatStore.sessionId)}`;

      // 创建 EventSource（注意：uni-app 不支持原生 EventSource，需要使用 polyfill 或自定义实现）
      // 这里使用 uni.request 的方式模拟 SSE
      return new Promise((resolve, reject) => {
        uni.request({
          url,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
          },
          data: {
            message,
            sessionId: chatStore.sessionId,
            stream: true
          },
          enableChunked: true, // 启用分块传输
          success: (res: any) => {
            if (res.statusCode === 200) {
              // 处理流式响应
              const content = res.data?.content || res.data || '';
              chatStore.appendStreamContent(content);
              chatStore.endStreaming();
              chatStore.saveChat();
              
              logger.info('Streaming message completed');
              resolve(true);
            } else {
              throw new Error(`请求失败 (${res.statusCode})`);
            }
          },
          fail: (err: any) => {
            logger.error('Streaming message failed', err);
            chatStore.endStreaming();
            chatStore.addAssistantMessage('抱歉，流式响应失败。请稍后再试。');
            reject(err);
          }
        });
      });
    } catch (err: any) {
      logger.error('Failed to stream message', err);
      error.value = err.message || '流式消息失败';
      
      chatStore.endStreaming();
      chatStore.addAssistantMessage('抱歉，我遇到了一些问题。请稍后再试。');
      
      return false;
    }
  };

  /**
   * 清空聊天历史
   */
  const clearChat = () => {
    chatStore.clearMessages();
    chatStore.saveChat();
    
    uni.showToast({
      title: '聊天记录已清空',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 重置会话（开始新对话）
   */
  const resetSession = () => {
    chatStore.resetSession();
    
    uni.showToast({
      title: '已开始新对话',
      icon: 'success',
      duration: 1500
    });
  };

  /**
   * 删除消息
   */
  const deleteMessage = (messageId: string) => {
    chatStore.deleteMessage(messageId);
    chatStore.saveChat();
  };

  /**
   * 获取消息列表
   */
  const getMessages = () => {
    return chatStore.messages;
  };

  return {
    // 状态
    isLoading,
    error,
    
    // 计算属性
    messages,
    sessionId,
    isStreaming,
    
    // 方法
    initChat,
    sendMessage,
    streamMessage,
    clearChat,
    resetSession,
    deleteMessage,
    getMessages
  };
};

export default useChat;
