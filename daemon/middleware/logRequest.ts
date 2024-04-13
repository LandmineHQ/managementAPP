import morgan from "morgan";

let morganMode = "combined";
if (process.env.NODE_ENV === "development") morganMode = "dev";

export default morgan(morganMode);
