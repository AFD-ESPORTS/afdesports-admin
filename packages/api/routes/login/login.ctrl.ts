// Mon controller doit:
// - appeler le service qui va chercher les données de l'utilisateur sur Discord pour récupérer son token ✅
// - avec le token, demande les infos de l'utilisateur:
//   - id ✅
//   - username ✅
//   - roles du discord AFD.ESPORTS ✅
//   - s'il est admin du discord AFD.ESPORTS
//   - stocker les infos dans res.locals.data
// - si tout est bon, vérifie si l'utilisateur existe en DB, le cas échéant le créé
// - stock le log de connexion dans la DB
// - renvoyer les données à la route via res.locals.data
// - renvoyer les erreurs à next() pour que le middleware d'erreur les gère s'il y en a
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { CustomError } from "#root/middlewares/errorHandler";
import {
  fetchGuildDatasFromDiscord,
  fetchUserDatasFromDiscord,
  // fetchUserGuildsFromDiscord,
  fetchGuildRolesFromDiscord,
  getUserTokenFromDiscord,
} from "#services/users/users.service";

// import { AxiosResponse } from "axios";
import type {
  UserToken,
  TokenError,
  ExtendedUserDatas,
  AdminRoles,
} from "#types/discordTypes.d";
import { AxiosResponse } from "axios";

export const controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userDatas: ExtendedUserDatas = {
    datas: null,
    guilds: null,
    isAdmin: false,
  };
  try {
    const getUserToken: UserToken | TokenError | Error =
      await getUserTokenFromDiscord(req.body.userToken);
    // console.log("Status: ", getUserToken);

    if ("status" in getUserToken && getUserToken.status !== 200) {
      throw new CustomError(
        getUserToken.status,
        [
          "Error while fetching user token from Discord",
          getUserToken.data.error_description,
        ],
        { req, res, next }
      );
    }
    // return getUserToken;
    if ("access_token" in getUserToken) {
      userDatas.datas = await fetchUserDatasFromDiscord(getUserToken);
      // console.log("User datas: ", getUserDatas);
      // const userGuilds: UserGuilds | TokenError | Error =
      //   await fetchUserGuildsFromDiscord(getUserToken);
      // console.log("User guilds: ", userGuilds);
      // if ("id" in userDatas.datas) {
      userDatas.guilds = await fetchGuildDatasFromDiscord(getUserToken);
      // console.log("Guild datas: ", guildDatas);
      // }
      const serverRoles: AxiosResponse<Array<AdminRoles>> =
        await fetchGuildRolesFromDiscord();
      if (Array.isArray(serverRoles) && serverRoles.length > 0) {
        const acceptedAdminRoles: Array<string> = [
          "🎮AFD.ESPORTS Staff",
          "admins",
        ];
        userDatas.isAdmin = !!_.filter(serverRoles, (r) => {
          return acceptedAdminRoles.includes(r.name);
        });
      }
    }
    // console.log("User datas: ", userDatas);
    return userDatas;
  } catch (error) {
    // console.log("Error in controller: ", error);
    next(error);
  }

  // try {
  //   const getUserDatas: any = await fetchUserDatasFromDiscord(getUserToken);
  //   console.log("User datas: ", getUserDatas);
  // } catch (error) {
  //   console.log("Error in controller: ", error);
  //   next(error);
  // }

  next();
  //   return (res.locals.data = fetchUserDatasFromDiscord(req.body.userToken));
  //   next();
};
