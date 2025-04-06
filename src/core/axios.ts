/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface AxiosResponseData<T = any> {
  detail: 'OK' | 'NOT_FOUND';
  result: T;
}

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

  public get<P, R = any>(url: string, params?: P): Promise<AxiosResponse<AxiosResponseData<R>>> {
    return this.axiosInstance.get<AxiosResponseData<R>>(url, { params });
  }

  public post<D, R = any>(url: string, data?: D): Promise<AxiosResponse<AxiosResponseData<R>>> {
    return this.axiosInstance.post<AxiosResponseData<R>>(url, data);
  }
}

const api = {
  service: new Service('BASE_UTL'),
};

export { api };
