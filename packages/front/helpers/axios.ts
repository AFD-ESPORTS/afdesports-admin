import axiosLib from "axios";
import { version } from "../package.json";
import { useUserStore } from "@/stores/user";
import { usePopUpsStore } from "@/stores/popups";

import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import type { UserDatas } from "@/types/User";

const { VITE_API_URL, VITE_API_PORT } = import.meta.env;

export const api: AxiosInstance = axiosLib.create({
  baseURL: `${VITE_API_URL}:${VITE_API_PORT}`,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    "x-app-version": version,
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userDatas: { token: string } = JSON.parse(
    localStorage.getItem("userData") ?? "{}"
  );
  const userToken: string = userDatas.token;
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    return response;
  },
  (originalError: AxiosError) => {
    const popupsStore = usePopUpsStore();
    popupsStore.setPopUp(originalError, "error");
  }
);
