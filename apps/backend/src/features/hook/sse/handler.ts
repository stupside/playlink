import { MyRoute, sse } from "../../../fastify";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = request.requestContext.get("identity");

    if (identity === undefined) return response.unauthorized();

    await sse(fastify, request, response, identity.session);
  };
