import { Static } from "@sinclair/typebox";

import {
  MyRoute,
  dispatch,
  PlaylinkSessionType,
  PlaylinkSessionSchema,
} from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const value = await fastify.redis.codes.getdel(
      request.body.key.toLowerCase()
    );

    if (value === null) return response.unauthorized();

    const session = Number.parseInt(value);

    const ip = request.body.device?.ip ?? request.ip;
    const agent = request.body.device?.agent ?? request.headers["user-agent"];

    const device = await prisma.device.create({
      data: {
        ip,
        agent,
        sessionId: session,
      },
    });

    const payload: Static<typeof PlaylinkSessionSchema> = {
      device: device.id,
      session: device.sessionId,
      type: PlaylinkSessionType.Client,
    };

    // fastify.createSecureSession(payload);
    // fastify.encodeSecureSession(request.session);

    const token = fastify.jwt.sign(payload, {
      expiresIn: fastify.config.PLAYLINK_JWT_EXPIRY,
    });

    await dispatch(fastify, payload.session, {
      type: "/session/connect",
      data: {
        device: device.id,
      },
    });

    return await response.send({
      token,
      device: device.id,
      session: device.sessionId,
    });
  };
