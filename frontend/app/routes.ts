import { index, type RouteConfig } from "@react-router/dev/routes";
import { valuesRoutes } from "./features/values/routes";

export default [
  index("routes/home.tsx"),
  ...valuesRoutes
] satisfies RouteConfig;

