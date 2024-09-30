import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import axios from "axios";
import { localStore } from "../localStore";
import { APP_BUILD, APP_DEVICE_ID } from "./configs";

export type HttpInterface = AxiosRequestConfig;

export const formatHttpResponse = (response: AxiosResponse): any => {
  return response.data;
};

export const formatHttpError = (error: AxiosError): any => {
  return error;
};

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

const responseHandler = (response: AxiosResponse) => response;

export const externalHttp = ({
  baseURL,
  headers = {},
}: HttpInterface): AxiosInstance => {
  const headersConfig: any = {
    Accept: "application/json, text/plain, */*",
    ...headers,
  };
  const client = axios.create({
    baseURL,
    timeout: 20000,
    headers: headersConfig,
  });

  client.interceptors.response.use(
    (response: any) => responseHandler(response),
    (error: any) => errorHandler(error)
  );

  return client;
};

export const http = ({
  baseURL,
  headers = {},
}: HttpInterface): AxiosInstance => {
  // App Global request Headers
  const headersConfig: AxiosRequestHeaders|any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    device: APP_DEVICE_ID,
    build: APP_BUILD,
    lang: 0,
    ...headers,
  };
  if (localStore.getAuthToken()) {
    headersConfig.Authorization = `Bearer ${localStore.getAuthToken()}`;
  }

  const client = axios.create({
    baseURL,
    timeout: 20000,
    headers: headersConfig,
  });

  client.interceptors.response.use(
    (response: any) => responseHandler(response),
    (error: any) => errorHandler(error)
  );

  return client;
};
