/**
 * 聊天相关 API
 */

import { post } from '@/utils/request';
import type { ChatRequest, ChatResponse } from '@/types';

/**
 * 发送聊天消息（标准模式）
 */
export const sendMessage = (data: ChatRequest): Promise<ChatResponse> => {
  return post<ChatResponse>('/chat', data);
};

/**
 * 发送聊天消息（流式模式）
 * 注意：流式响应需要特殊处理，此方法返回 SSE 连接
 */
export const sendMessageStream = (data: ChatRequest): Promise<any> => {
  // 流式响应将在 useChat composable 中实现
  return post<any>('/chat/stream', data);
};

export default {
  sendMessage,
  sendMessageStream
};
