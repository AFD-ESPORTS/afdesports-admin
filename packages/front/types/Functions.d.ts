export type navigateFunc = () =>
  | false
  | void
  | RouteLocationRaw
  | Promise<false | void | NavigationFailure>;

export type getUserDatasFunc = (code: string) => Promise<void>;
