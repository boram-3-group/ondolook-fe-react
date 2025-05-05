/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { serviceUrl } from './constants';
import { useUserStore } from '../store/useUserStore';

class Service {
  private axiosInstance: AxiosInstance;

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
      error => {
        if (error.response?.status === 401) {
          useUserStore.getState().logout();
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

  public delete<R = any>(url: string, data?: any, options?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.delete<R>(url, { data, ...options });
  }
}

const api = {
  service: new Service(serviceUrl.base_url),
};

export { api };
