import { FastifyInstance } from "fastify";

import context from "@fastify/request-context";

import { Static } from "@sinclair/typebox";

import { PlaylinkSessionSchema, PlaylinkSessionType } from "..";

import { PlaylinkSessionHeaderSchema } from ".";

const hook = async (
  fastify: FastifyInstance,
  claims: PlaylinkSessionType[]
) => {
  await fastify.register(context, { hook: "preHandler" });

  fastify.addHook<{
    Headers: Static<typeof PlaylinkSessionHeaderSchema>;
  }>("preHandler", async (request, response) => {
    const token = request.headers["x-playlink-token"];

    const identity =
      fastify.jwt.verify<Static<typeof PlaylinkSessionSchema>>(token);

    if (identity === undefined) return await response.unauthorized();

    if (claims.includes(identity.type)) {
      fastify.requestContext.set("playlink", identity);
    } else {
      return await response.badRequest();
    }
  });
};

export default hook;
