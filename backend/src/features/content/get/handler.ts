import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const { id } = request.params;

    const token = fastify.requestContext.get("x-playlink-token");

    if (token === undefined) return await response.unauthorized();

    const content = await prisma.content.findFirstOrThrow({
      where: {
        id,
        sessionId: token.session,
      },
      select: {
        type: true,
        value: true,
      },
    });

    return await response.send(content);
  };
