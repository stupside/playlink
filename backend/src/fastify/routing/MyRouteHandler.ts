import { RouteGenericInterface, RouteHandler } from "fastify";

type MyRouteHandler<TSchema extends RouteGenericInterface> =
  RouteHandler<TSchema>;

export default MyRouteHandler;
