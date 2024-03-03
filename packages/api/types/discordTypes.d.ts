import { AxiosResponse } from "axios";

export type UserToken = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type UserDatas = {
  id: string;
  username: string;
  global_name: string;
  avatar: string;
  discriminator?: string;
  public_flags?: number;
  premium_type?: number;
  flags?: number;
  banner?: string;
  accent_color?: number;
  avatar_decoration_data?: {
    asset: string;
    sku_id: string;
  };
  banner_color?: null;
  mfa_enabled?: boolean;
  locale?: string;
  email?: string;
  verified?: boolean;
};

export type UserGuilds = Array<{
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: Array<string>;
  approximate_member_count: number;
  approximate_presence_count: number;
}>;

export type AdminRoles = {
  id: string;
  name: string;
  description: string;
  permissions: number;
  permissions_new: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon: string;
  unicode_emoji?: string;
  flags: number;
  tags?: {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: boolean | null;
    subscription_listing_id?: string;
    available_for_purchase?: boolean | null;
    guild_connections?: boolean | null;
  };
};

export type GuildDatas = {
  user?: UserDatas;
  nick?: string;
  avatar?: string;
  roles: Array<string>;
  joined_at: Date;
  premium_since?: Date;
  deaf: boolean;
  mute: boolean;
  flags: number;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: Date;
};

export type ExtendedUserDatas = {
  datas: null | UserDatas | TokenError | Error;
  guilds: null | UserGuilds | TokenError | Error;
  isAdmin: boolean;
};

export interface TokenError extends AxiosResponse {
  status: number;
  data: {
    error: string;
    error_description: string;
  };
}
