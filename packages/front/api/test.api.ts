import { api } from "@/helpers/axios";
import { usePopUpsStore } from "@/stores/popups";

export const testApi = async (): Promise<void> => {
  const popUpsStore = usePopUpsStore();
  await api
    .post("/token", {
      tokenType: "user-token",
      userId: 1,
    })
    .then((response) => {
      console.log(response.data);
      popUpsStore.setPopUp(response.data, "success");
    })
    .catch((error) => {
      popUpsStore.setPopUp(error, "error");
    });
};
