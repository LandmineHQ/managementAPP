enum ROUTER_NAME {
  ROOT = "",
  USER = "user",
  AUTH = "auth",
  DEBUG = "debug",
  TRAINING = "training",
  MONITOR = "monitor",
}

const ROUTER_TOKENLESS = [
  ROUTER_NAME.DEBUG,
  ROUTER_NAME.ROOT,
  ROUTER_NAME.AUTH,
  ROUTER_NAME.MONITOR,
];

export { ROUTER_NAME, ROUTER_TOKENLESS };
