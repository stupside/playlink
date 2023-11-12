import { FastifyInstance } from "fastify";

import context from "@fastify/request-context";

import prisma from "../../../utils/prisma";

import { PLAYLINK_TOKEN_HEADER_KEY, PlaylinkTokenHeader } from "./header";

import { PlaylinkToken, PlaylinkTokenClaim } from ".";

const hook = async (fastify: FastifyInstance, claims: PlaylinkTokenClaim[]) => {
  await fastify.register(context, { hook: "preHandler" });

  fastify.addHook<{
    Headers: PlaylinkTokenHeader;
  }>("preHandler", async (request, response) => {
    const token = request.headers["x-playlink-token"];

    const payload = fastify.jwt.verify<PlaylinkToken>(token);

    const device = await prisma.device.findFirst({
      where: {
        id: payload.device,
      },
      select: {
        archived: true,
      },
    });

    if (device) {
      if (device.archived)
        return await response.unauthorized("Device archived");

      if (
        payload.claims.every((claim) => {
          return claims.includes(claim);
        })
      ) {
      } else {
        return await response.unauthorized("Device claims mismatch");
      }
    } else {
      return await response.unauthorized("Device not found");
    }

    fastify.requestContext.set(PLAYLINK_TOKEN_HEADER_KEY, payload);
  });
};

export default hook;
