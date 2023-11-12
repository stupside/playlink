import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const { id } = request.params;
    const { archive } = request.body;

    const token = fastify.requestContext.get("x-playlink-token");

    if (token === undefined) return await response.unauthorized();

    await prisma.device.update({
      where: {
        id,
        sessionId: token.session,
      },
      data: {
        archived: archive,
      },
    });
  };
