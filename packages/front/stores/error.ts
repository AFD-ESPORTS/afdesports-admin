import { defineStore } from "pinia";
import { AxiosError } from "axios";

import type { CustomError } from "~/types/CustomError";

export const useErrorStore = defineStore("user", () => {
  const errors: Ref<Array<CustomError>> = ref([]);

  const normalizeError = (error: Error | AxiosError): CustomError => {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status || 500,
        message: error.response?.data.message || error.message,
        stack: error.stack,
        name: error.name,
      };
    }

    return {
      code: 500,
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  };
  const setError = (datas: Error): void => {
    errors.value.push(normalizeError(datas));
  };

  return { errors, setError };
});
