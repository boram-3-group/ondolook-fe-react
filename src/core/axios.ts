/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { serviceUrl } from './constants';

class Service {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 15000,
    });

    this.axiosInstance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => Promise.reject(error)
    );
  }

  public get<R = any>(url: string, params?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.get<R>(url, { params });
  }

  public post<R = any>(url: string, data?: any, options?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.post<R>(url, data, options);
  }

  public put<R = any>(url: string, data?: any): Promise<AxiosResponse<R>> {
    return this.axiosInstance.put<R>(url, data);
  }
}

const api = {
  service: new Service(serviceUrl.base_url),
};

export { api };
