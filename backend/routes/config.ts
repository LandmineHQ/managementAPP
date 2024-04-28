enum ROUTER_NAME {
  ROOT = "",
  USER = "user",
  AUTH = "auth",
  DEBUG = "debug",
  TRAINING = "training",
}

const ROUTER_TOKENLESS = [
  ROUTER_NAME.DEBUG,
  ROUTER_NAME.ROOT,
  ROUTER_NAME.AUTH,
];

export default ROUTER_NAME;
export { ROUTER_TOKENLESS };
