import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const { value, type } = request.body;

    const token = fastify.requestContext.get("x-playlink-token");

    if (token === undefined) return await response.unauthorized();

    const content = await prisma.content.create({
      data: {
        type,
        value,
        sessionId: token.session,
      },
    });

    await dispatch(fastify, token.session, {
      type: "/content/create",
      data: {
        id: content.id,
        type: content.type,
        value: content.value,
      },
    });

    return await response.redirect(`/contents/${content.id}`);
  };
