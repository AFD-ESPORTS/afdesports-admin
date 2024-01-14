import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      discord: {
        clientId: null,
        redirectUri: null,
      },
    };
  },
  mutations: {
    "discord/setClientId"(state, clientId) {
      state.discord.clientId = clientId;
    },
    "discord/setRedirectUri"(state, redirectUri) {
      state.discord.redirectUri = redirectUri;
    },
  },
  actions: {
    // vos actions ici
  },
  getters: {
    // vos getters ici
  },
});
