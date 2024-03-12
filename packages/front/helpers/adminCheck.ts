import { useUserStore } from "@/stores/user";
import { usePopUpsStore } from "@/stores/popups";
import { useRouter } from "vue-router";

import type { UserDatas } from "~/types/User";

export const adminCheck = () => {
  const userStore = useUserStore();
  const popUpsStore = usePopUpsStore();
  const router = useRouter();
  let isAdmin: boolean = false;

  if (typeof window !== "undefined") {
    const userDatas: { datas: UserDatas; isAdmin: boolean } = JSON.parse(
      localStorage.getItem("userData") ?? "{}"
    );
    isAdmin = userDatas.isAdmin;
  } else {
    isAdmin = userStore.isAdmin;
  }

  if (!isAdmin) {
    popUpsStore.setPopUp(new Error("Vous n'êtes pas admin!"), "error");
    router.push("/login");
  }
};
