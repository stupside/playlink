import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const playlink = fastify.requestContext.get("playlink");

    if (playlink === undefined) return await response.unauthorized();

    const content = await prisma.content.findFirstOrThrow({
      where: {
        id: request.params.id,
        sessionId: playlink.session,
      },
      select: {
        type: true,
        value: true,
        subtype: true,
      },
    });

    return await response.send(content);
  };
