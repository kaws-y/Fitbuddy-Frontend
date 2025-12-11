/**
 * 请求重试工具
 * 实现指数退避重试策略
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * 重试请求
 * @param requestFn 请求函数
 * @param options 重试选项
 */
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = defaultShouldRetry
  } = options;

  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error: any) {
      lastError = error;

      // 检查是否应该重试
      if (!shouldRetry(error)) {
        throw error;
      }

      // 如果是最后一次尝试，直接抛出错误
      if (attempt === maxRetries - 1) {
        break;
      }

      // 计算延迟时间（指数退避）
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      console.log(`Request failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
      
      // 等待后重试
      await sleep(delay);
    }
  }

  throw lastError;
};

/**
 * 默认的重试判断逻辑
 */
const defaultShouldRetry = (error: any): boolean => {
  // 不重试认证错误
  if (error.code === 'AUTHENTICATION_ERROR' || error.message?.includes('登录')) {
    return false;
  }

  // 不重试客户端错误（4xx）
  if (error.statusCode >= 400 && error.statusCode < 500) {
    return false;
  }

  // 重试网络错误和服务器错误（5xx）
  return true;
};

/**
 * 延迟函数
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default retryRequest;
