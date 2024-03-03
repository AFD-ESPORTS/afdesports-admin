import type { Middleware } from "@nuxt/types";

const auth: Middleware = ({ store, redirect }) => {
  if (!store.state.auth.isLoggedIn) {
    return redirect("/login");
  }
};

export default auth;
