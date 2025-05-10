/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { serviceUrl } from './constants';
import { useUserStore } from '../store/useUserStore';
import toast from 'react-hot-toast';

class Service {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 15000,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      config => {
        const token = useUserStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.axiosInstance(originalRequest);
              })
              .catch(err => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.axiosInstance.post('/api/v1/auth/reissue');
            const { access } = response.data;
            useUserStore.getState().setAccessToken(access);

            this.failedQueue.forEach(promise => {
              promise.resolve(access);
            });

            originalRequest.headers.Authorization = `Bearer ${access}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.failedQueue.forEach(promise => {
              promise.reject(refreshError);
            });
            useUserStore.getState().logout();
            toast.error('로그인이 필요합니다.');
            location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
            this.failedQueue = [];
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public get<R = any>(url: string, params?: any, options?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.get<R>(url, { params, ...options });
  }

  public post<R = any>(url: string, data?: any, options?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.post<R>(url, data, options);
  }

  public put<R = any>(url: string, data?: any, options?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.put<R>(url, data, options);
  }

  public delete<R = any>(url: string, data?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.delete<R>(url, data ? { data } : undefined);
  }
}

const api = {
  service: new Service(serviceUrl.base_url),
};

export { api };
