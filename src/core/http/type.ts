import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

export interface LoadingInfo {
  instance: LoadingInstance | null;
  requestCount: number;
}

export interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean;
}

export interface RequestResponse<T = any> extends Omit<AxiosResponse, 'config'> {
  config: RequestConfig;
  data: {
    code: string;
    message: string;
    data: T;
  };
}
