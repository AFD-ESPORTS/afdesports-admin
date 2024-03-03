import { api } from "../axios";
import { Users } from "./users.model";

import type {
  UserToken,
  UserDatas,
  UserGuilds,
  TokenError,
  AdminRoles,
} from "#types/discordTypes.d";
import { AxiosResponse } from "axios";

const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirectUri = `${process.env.FRONTEND_URL}/login`;
const guildId = process.env.DISCORD_GUILD_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

export const addUser = async (username: string, accessLevel: number) => {
  await Users.create({
    username,
    access_level: accessLevel,
  });
};

export const getUser = async (username: string) => {
  const user = await Users.findOne({ where: { username }, logging: false });
  return user;
};

export const getUserTokenFromDiscord = async (
  code: string
): Promise<UserToken | TokenError | Error> => {
  if (!clientId || !clientSecret || !redirectUri) {
    return new Error("Environment variables must be set");
  }
  const gettingUserToken = await api.post(
    "/oauth2/token",
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      scope: "identify",
    })
  );
  return gettingUserToken;
};

export const refreshUserTokenFromDiscord = async (refreshToken: string) => {
  if (!clientId || !clientSecret) {
    return new Error("Environment variables must be set");
  }
  const gettingUserToken = await api.post(
    "/oauth2/token",
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    })
  );
  return gettingUserToken;
};

export const fetchUserDatasFromDiscord = async (
  token: UserToken
): Promise<UserDatas | TokenError | Error> => {
  const userDatas = await api.get("/users/@me", {
    headers: {
      authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  return userDatas;
};

export const fetchUserGuildsFromDiscord = async (
  token: UserToken
): Promise<UserGuilds | TokenError | Error> => {
  const userGuilds = await api.get("/users/@me/guilds", {
    headers: {
      authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  return userGuilds;
};

export const fetchGuildDatasFromDiscord = async (token: UserToken) => {
  if (!guildId) {
    return new Error("Environment variables must be set");
  }

  const guildDatas = await api.get(`/users/@me/guilds/${guildId}/member`, {
    headers: {
      authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  return guildDatas;
};

export const fetchGuildRolesFromDiscord = async (): Promise<
  AxiosResponse<Array<AdminRoles>>
> => {
  const guildRoles = await api.get(`/guilds/${guildId}/roles`, {
    headers: {
      authorization: `Bot ${botToken}`,
    },
  });
  return guildRoles;
};
