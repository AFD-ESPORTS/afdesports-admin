// Mon controller doit:
// - appeler le service qui va chercher les données de l'utilisateur sur Discord pour récupérer son token ✅
// - avec le token, demande les infos de l'utilisateur:
//   - id ✅
//   - username ✅
//   - roles du discord AFD.ESPORTS ✅
//   - s'il est admin du discord AFD.ESPORTS ✅
//   - générer le JWT de l'utilisateur ✅
//   - préparer les datas ✅
// - si tout est bon, vérifie si l'utilisateur existe en DB, le cas échéant le créé
// - stock le log de connexion dans la DB
// - renvoyer les données à la route via res.locals.data
// - renvoyer les erreurs à next() pour que le middleware d'erreur les gère s'il y en a
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { CustomError } from "#root/middlewares/errorHandler";
import {
  fetchGuildDatasFromDiscord,
  fetchUserDatasFromDiscord,
  fetchGuildRolesFromDiscord,
  getUserTokenFromDiscord,
} from "#services/users/users.service";

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

    if ("access_token" in getUserToken) {
      userDatas.datas = await fetchUserDatasFromDiscord(getUserToken);
      userDatas.guilds = await fetchGuildDatasFromDiscord(getUserToken);
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
    if (userDatas.datas && process.env.JWT_SECRET)
      userDatas.token = jwt.sign(userDatas.datas, process.env.JWT_SECRET);
    return userDatas;
  } catch (error) {
    next(error);
  }

  next();
};
