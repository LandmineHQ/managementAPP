enum ROUTER_NAME {
  ROOT = "",
  USER = "user",
  AUTH = "auth",
  TEST = "test",
}

const ROUTER_NEED_TOKEN = [ROUTER_NAME.USER, ROUTER_NAME.AUTH];

export default ROUTER_NAME;
export { ROUTER_NEED_TOKEN };
