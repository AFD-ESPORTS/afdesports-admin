import { api } from "@/helpers/axios";

import type { UserDatas } from "~/types/User";

export const fetchUserDatasFromDiscord = async (
  token: string
): Promise<UserDatas> => {
  const userDatas: UserDatas = await api
    .post(
      "/login",
      {
        userToken: token,
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      return response.data;
    });
  return userDatas;
};
