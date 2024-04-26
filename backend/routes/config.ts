enum ROUTER_NAME {
  ROOT = "",
  USER = "user",
  AUTH = "auth",
}

const ROUTER_TOKENLESS = [ROUTER_NAME.ROOT, ROUTER_NAME.AUTH];

export default ROUTER_NAME;
export { ROUTER_TOKENLESS };
