export interface UserDatas {
  datas: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: string;
    accent_color: null | string;
    global_name: string;
    avatar_decoration_data: {
      asset: string;
      sku_id: string;
    };
    banner_color: null | string;
    mfa_enabled: boolean;
    locale: string;
    email: string;
    verified: boolean;
  };
  guilds: {
    avatar: null | string;
    communication_disabled_until: null | string;
    flags: number;
    joined_at: string;
    nick: string;
    pending: boolean;
    premium_since: string;
    roles: string[];
    unusual_dm_activity_until: null | string;
    user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
      premium_type: number;
      flags: number;
      banner: string;
      accent_color: null | string;
      global_name: string;
      avatar_decoration_data: {
        asset: string;
        sku_id: string;
      };
      banner_color: null | string;
    };
    mute: boolean;
    deaf: boolean;
    bio: string;
    banner: null | string;
  };
  token: string;
  isAdmin: boolean;
}
