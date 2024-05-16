enum ROUTER_NAME {
  ROOT = "",
  USER = "user",
  AUTH = "auth",
  DEBUG = "debug",
  TRAINING = "training",
  MONITOR = "monitor",
  POLICY = "policy",
  IMAGE = "image",
  GROUP = "group",
  MESSAGE = "message",
  DATA = "data",
}

const ROUTER_TOKENLESS = [
  ROUTER_NAME.DEBUG,
  ROUTER_NAME.ROOT,
  ROUTER_NAME.AUTH,
  ROUTER_NAME.MONITOR,
  ROUTER_NAME.POLICY,

  `${ROUTER_NAME.USER}/profile`,
];

export { ROUTER_NAME, ROUTER_TOKENLESS };
