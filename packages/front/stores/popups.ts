import { defineStore } from "pinia";
import { AxiosError } from "axios";

import type { CustomError } from "~/types/CustomError";
import type { PopUp } from "~/types/CustomPopUp";

export const usePopUpsStore = defineStore("popups", () => {
  const popup: Ref<Array<PopUp>> = ref([]);

  const normalizeError = (error: Error | AxiosError | CustomError): PopUp => {
    const timestamp = new Date().getTime();
    if (error instanceof AxiosError) {
      return {
        title: `${error.response?.status || 500}: ${error.name}`,
        message: error.message,
        type: "error",
        timestamp: timestamp,
      };
    }

    return {
      title: `500: ${error.name}`,
      message: error.message,
      type: "error",
      timestamp: timestamp,
    };
  };

  const setPopUp = (
    datas: Error | CustomError | PopUp,
    dataType: string
  ): void => {
    if (dataType === "error") {
      popup.value.push(normalizeError(datas as Error | AxiosError));
    } else {
      popup.value.push({
        ...(datas as PopUp),
        timestamp: new Date().getTime(),
      });
    }
  };

  const removePopUp = (index: number): void => {
    popup.value.splice(index, 1);
  };

  return { popup, setPopUp, removePopUp };
});
