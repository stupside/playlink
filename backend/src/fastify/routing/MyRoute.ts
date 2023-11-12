import { RouteGenericInterface, FastifyInstance } from "fastify";

import MyRouteHandler from "./MyRouteHandler";

type MyRoute<TSchema extends RouteGenericInterface> = (
  fastify: FastifyInstance,
) => MyRouteHandler<TSchema>;

export default MyRoute;
