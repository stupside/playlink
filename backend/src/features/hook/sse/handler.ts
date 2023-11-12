import { MyRoute, sse } from "../../../fastify";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const playlink = request.requestContext.get("playlink");

    if (playlink === undefined) return response.badGateway();

    await sse(fastify, request, response, playlink.session);
  };
