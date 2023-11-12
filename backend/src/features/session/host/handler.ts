import { Static } from "@sinclair/typebox";

import {
  MyRoute,
  PlaylinkSessionType,
  PlaylinkSessionSchema,
} from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const session = await prisma.session.create({
      data: {},
    });

    const device = await prisma.device.create({
      data: {
        ip: request.body.ip ?? request.ip,
        agent: request.body.agent ?? request.headers["user-agent"],
        sessionId: session.id,
      },
    });

    const payload: Static<typeof PlaylinkSessionSchema> = {
      device: device.id,
      session: session.id,
      type: PlaylinkSessionType.Host,
    };

    // fastify.createSecureSession(payload);
    // fastify.encodeSecureSession(request.session);

    const token = fastify.jwt.sign(payload, {
      expiresIn: fastify.config.PLAYLINK_JWT_EXPIRY,
    });

    return await response.send({
      token,
      device: device.id,
      session: session.id,
    });
  };
