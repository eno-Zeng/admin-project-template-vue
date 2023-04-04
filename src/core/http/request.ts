import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { ElLoading, ElMessage } from 'element-plus';

import { LoadingInfo, RequestConfig, RequestResponse } from './type';

class Request {
  private instance: AxiosInstance;

  private loadingInfo: LoadingInfo = {
    instance: null,
    requestCount: 0,
  };

  constructor() {
    this.instance = axios.create({
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      // baseURL: process.env.VUE_APP_BASE_URL,
      withCredentials: true,
    });
  }

  isSuccess(status: number | string) {
    return status === 200 || status === '200';
  }

  // 请求拦截处理 loading, url 和参数
  handleRequest(config: RequestConfig) {
    if (config.loading) this.showLoading();

    // 拼接 url 的域名地址
    const isExternal = /^(https?:)/.test(config.url!);
    if (!isExternal) {
      // TODO: 拼接 url
    }

    // 处理 get 和 delete 请求参数
    if (['GET', 'DELETE'].includes((config.method || 'GET')?.toLocaleUpperCase())) {
      config.params = qs.stringify(config.params);
    }

    return config;
  }

  // 响应拦截处理返回
  handleResponse(response: RequestResponse) {
    const { config, data, request } = response;

    if (!this.isSuccess(data.code)) {
      const error = new AxiosError(
        data.message,
        data.code,
        config as InternalAxiosRequestConfig,
        request,
        response as AxiosResponse,
      );
      throw error;
    }

    if (config.loading) this.closeLoading();

    return response;
  }

  // 处理请求错误
  handleError(error: AxiosError) {
    this.closeLoading();

    if (error.response) {
      const messages: Record<number, string> = {
        400: '错误请求',
        401: '会话过期，请重新登录',
        403: '拒绝访问',
        404: '请求错误，未找到该资源',
        405: '请求方法未允许',
        408: '请求超时',
        500: '服务器端出错',
        501: '网络未实现',
        502: '网络错误',
        503: '服务不可用',
        504: '网络超时',
        505: 'http版本不支持该请求',
      };
      error.message = messages[error.response.status] || `连接错误${error.response.status}`;
    } else {
      error.message = error.message || '连接到服务器失败';
    }

    ElMessage.error(error.message);

    return error;
  }

  showLoading() {
    if (this.loadingInfo.requestCount === 0) {
      this.loadingInfo.instance = ElLoading.service();
    }
    this.loadingInfo.requestCount += 1;
  }

  closeLoading() {
    this.loadingInfo.requestCount -= 1;
    if (this.loadingInfo.requestCount === 0) {
      this.loadingInfo.instance!.close();
      this.loadingInfo.instance = null;
    }
  }

  async requestFile(config: RequestConfig) {
    config.responseType = 'blob';
    return this.instance.request(config);
  }

  async request<T = any>(config: RequestConfig) {
    const _config = this.handleRequest(config);
    try {
      const response = await this.instance.request<any, RequestResponse<T>>(_config);

      const _res = this.handleResponse(response);
      return _res.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  get<T = any>(config: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: RequestConfig) {
    return this.request<T>({ ...config, method: 'POST' });
  }

  put<T = any>(config: RequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: RequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default Request;
