import { MyRoute, sse } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const token = fastify.requestContext.get("x-playlink-token");

    if (token === undefined) return response.unauthorized();

    const session = await prisma.session.findUniqueOrThrow({
      where: {
        id: token.session,
      },
      select: {
        id: true,
      },
    });

    await sse(fastify, request, response, session.id);
  };
