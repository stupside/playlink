import { MyRoute, PlaylinkToken, PlaylinkTokenClaim } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const session = await prisma.session.create({
      data: {},
    });

    const ip = request.ip;
    const agent = request.headers["user-agent"];

    const device = await prisma.device.create({
      data: {
        ip,
        agent,
        sessionId: session.id,
      },
    });

    const payload: PlaylinkToken = {
      device: device.id,
      session: session.id,
      claims: [PlaylinkTokenClaim.Host],
    };

    const token = fastify.jwt.sign(payload, {
      expiresIn: fastify.config.SESSION_TOKEN_EXPIRY,
    });

    return await response.send({
      token,
      device: device.id,
      session: session.id,
    });
  };
