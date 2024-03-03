import axiosLib from "axios";
import { version } from "../package.json";
import { useErrorStore } from "@/stores/error";

import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const { VITE_API_URL, VITE_API_PORT } = import.meta.env;

export const api: AxiosInstance = axiosLib.create({
  baseURL: `${VITE_API_URL}:${VITE_API_PORT}`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "x-app-version": version,
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    return response;
  },
  (originalError: AxiosError) => {
    const errorStore = useErrorStore();
    errorStore.setError(originalError);
  }
);
