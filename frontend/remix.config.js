import { flatRoutes } from "remix-flat-routes";

/** @type {import('@remix-run/dev').AppConfig} */

export const cacheDirectory = "./node_modules/.cache/remix";

export const ignoredRouteFiles = ["**/*"];

export async function routes(defineRoutes) {
  return flatRoutes("routes", defineRoutes);
}
