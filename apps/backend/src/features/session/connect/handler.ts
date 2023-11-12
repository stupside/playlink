import { Static } from "@sinclair/typebox";

import { MyRoute, dispatch, PlaylinkSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import sse from "../../hook/sse";
import cast from "../../content/cast";
import retrieve from "../../content/retrieve";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const value = await fastify.redis.secrets?.getdel(
      request.body.key.toLowerCase(),
    );

    if (!value) return response.unauthorized();

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
      claims: [sse.Claim, retrieve.Claim, cast.Claim],
    };

    const token = await response.jwtSign(payload);

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
