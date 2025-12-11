/**
 * uni.request 封装工具
 * 提供统一的 API 调用接口，包含认证、错误处理和加载状态管理
 */

import { retryRequest } from './retry';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  showLoading?: boolean;
  loadingText?: string;
  timeout?: number;
  enableRetry?: boolean;
  maxRetries?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

// 获取 API 基础 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

/**
 * 统一请求方法（内部实现）
 */
const executeRequest = async <T = any>(options: RequestOptions): Promise<T> => {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    showLoading = true,
    loadingText = '加载中...',
    timeout = 30000
  } = options;

  // 添加认证令牌
  const token = uni.getStorageSync('token');
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  // 添加 Content-Type
  if (!header['Content-Type']) {
    header['Content-Type'] = 'application/json';
  }

  try {
    // 显示加载提示
    if (showLoading) {
      uni.showLoading({ title: loadingText, mask: true });
    }

    // 发起请求（使用 Promise 包装）
    const res = await new Promise<UniApp.RequestSuccessCallbackResult>((resolve, reject) => {
      uni.request({
        url: `${API_BASE_URL}${url}`,
        method,
        data,
        header,
        timeout,
        success: (res) => resolve(res),
        fail: (err) => reject(err)
      });
    });

    // 隐藏加载提示
    if (showLoading) {
      uni.hideLoading();
    }

    // 处理 HTTP 错误状态码
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      const errorMsg = handleHttpError(res.statusCode);
      const httpError: any = new Error(errorMsg);
      httpError.statusCode = res.statusCode;
      throw httpError;
    }

    // 解析响应数据
    const response = res.data as ApiResponse<T>;

    // 处理业务错误
    if (!response.success) {
      const errorMsg = response.error || '请求失败';
      
      // 特殊处理认证错误
      if (response.code === 'AUTHENTICATION_ERROR') {
        handleAuthError();
        const authError: any = new Error('登录已过期，请重新登录');
        authError.code = 'AUTHENTICATION_ERROR';
        throw authError;
      }

      const businessError: any = new Error(errorMsg);
      businessError.code = response.code;
      throw businessError;
    }

    return response.data as T;

  } catch (err: any) {
    // 隐藏加载提示
    if (showLoading) {
      uni.hideLoading();
    }

    // 处理网络错误
    if (!err.message) {
      const networkError: any = new Error('网络请求失败，请检查网络连接');
      networkError.isNetworkError = true;
      
      // 显示错误提示
      uni.showToast({
        title: networkError.message,
        icon: 'none',
        duration: 2000
      });
      
      throw networkError;
    }

    // 显示错误提示
    uni.showToast({
      title: err.message || '请求失败',
      icon: 'none',
      duration: 2000
    });

    throw err;
  }
};

/**
 * 统一请求方法（支持重试）
 */
export const request = async <T = any>(options: RequestOptions): Promise<T> => {
  const {
    enableRetry = false,
    maxRetries = 3,
    ...requestOptions
  } = options;

  // 如果启用重试，使用重试逻辑
  if (enableRetry) {
    return retryRequest(
      () => executeRequest<T>(requestOptions),
      {
        maxRetries,
        shouldRetry: (error: any) => {
          // 不重试认证错误
          if (error.code === 'AUTHENTICATION_ERROR') {
            return false;
          }
          
          // 不重试客户端错误（4xx，除了408超时）
          if (error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 408) {
            return false;
          }
          
          // 重试网络错误和服务器错误（5xx）
          return error.isNetworkError || (error.statusCode >= 500 && error.statusCode < 600);
        }
      }
    );
  }

  // 否则直接执行请求
  return executeRequest<T>(requestOptions);
};

/**
 * GET 请求
 */
export const get = <T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> => {
  return request<T>({
    url,
    method: 'GET',
    data,
    enableRetry: true, // GET 请求默认启用重试
    ...options
  });
};

/**
 * POST 请求
 */
export const post = <T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> => {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...options
  });
};

/**
 * PUT 请求
 */
export const put = <T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> => {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...options
  });
};

/**
 * DELETE 请求
 */
export const del = <T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> => {
  return request<T>({
    url,
    method: 'DELETE',
    data,
    ...options
  });
};

/**
 * 处理 HTTP 错误状态码
 */
const handleHttpError = (statusCode: number): string => {
  const errorMap: Record<number, string> = {
    400: '请求参数错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求的资源不存在',
    408: '请求超时',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时'
  };

  return errorMap[statusCode] || `请求失败 (${statusCode})`;
};

/**
 * 处理认证错误
 */
const handleAuthError = () => {
  // 清除本地存储的认证信息
  uni.removeStorageSync('token');
  uni.removeStorageSync('user');

  // 跳转到登录页
  uni.reLaunch({
    url: '/pages/auth/login'
  });
};

/**
 * 上传文件
 */
export const uploadFile = (
  url: string,
  filePath: string,
  name: string = 'file',
  formData?: Record<string, any>
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    const header: Record<string, string> = {};
    
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }

    uni.showLoading({ title: '上传中...', mask: true });

    uni.uploadFile({
      url: `${API_BASE_URL}${url}`,
      filePath,
      name,
      formData,
      header,
      success: (res) => {
        uni.hideLoading();
        
        if (res.statusCode === 200) {
          const response = JSON.parse(res.data) as ApiResponse;
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || '上传失败'));
          }
        } else {
          reject(new Error(`上传失败 (${res.statusCode})`));
        }
      },
      fail: () => {
        uni.hideLoading();
        reject(new Error('上传失败，请检查网络连接'));
      }
    });
  });
};

export default {
  request,
  get,
  post,
  put,
  del,
  uploadFile
};
