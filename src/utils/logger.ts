/**
 * 日志工具
 * 提供统一的日志记录接口
 */

const isDevelopment = import.meta.env.MODE === 'development';

export const logger = {
  /**
   * 调试日志（仅开发环境）
   */
  debug(message: string, ...args: any[]) {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },

  /**
   * 信息日志
   */
  info(message: string, ...args: any[]) {
    console.log(`[INFO] ${message}`, ...args);
  },

  /**
   * 警告日志
   */
  warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * 错误日志
   */
  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error);
    
    // 在生产环境可以发送到错误监控服务
    if (!isDevelopment && error) {
      // TODO: 集成错误监控服务（如 Sentry）
      // sendToErrorTracking(message, error);
    }
  }
};

export default logger;
