import { NextFunction } from "express";
import { RiotApi, LolApi, Constants } from "twisted";

const getAccount = async () => {
  const api = new RiotApi();
  // Recommended to use the nearest routing value to your server: americas, asia, europe
  return (
    await api.Account.getByRiotId(
      "SpanRa#DRAKE",
      "EUW1",
      Constants.RegionGroups.EUROPE
    )
  ).response;
};

export const controller = async (req: any, res: any, next: NextFunction) => {
  try {
    if (process.env.RIOT_API_KEY) {
      const lolApi = new LolApi();

      const user = await getAccount();
      console.log("User: ", user);
      //   return user;
      const matchlist = await lolApi.MatchV5.list(
        user.puuid,
        Constants.RegionGroups.EUROPE
      );
      const lastMatchId = matchlist.response[0];
      const lastMatch = lolApi.MatchV5.get(
        lastMatchId,
        Constants.RegionGroups.EUROPE
      );
      console.log("Last match: ", lastMatch);

      return lastMatch;
    }
  } catch (error) {
    console.error("Error in controller: ", error);
  }
};
