import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const playlink = fastify.requestContext.get("playlink");

    if (playlink === undefined) return await response.unauthorized();

    const content = await prisma.content.create({
      data: {
        type: request.body.type,
        value: request.body.value,
        sessionId: playlink.session,
        subtype: request.body.subtype,
      },
    });

    await dispatch(fastify, playlink.session, {
      type: "/content/cast",
      data: {
        id: content.id,
        type: content.type,
        value: content.value,
      },
    });

    return await response.redirect(`/contents/${content.id}`);
  };
