import {
  MyRoute,
  PlaylinkToken,
  PlaylinkTokenClaim,
  dispatch,
} from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const { key, code, name } = request.body;

    const value = await fastify.redis.codes.getdel(key);

    if (value === null) return response.unauthorized("Invalid key");

    const parsed = JSON.parse(value) as {
      code: string;
      session: number;
    };

    if (parsed.code === code) {
      const device = await prisma.device.create({
        data: {
          name,
          ip: request.ip,
          agent: request.headers["user-agent"],
          sessionId: parsed.session,
        },
      });

      const payload: PlaylinkToken = {
        device: device.id,
        session: parsed.session,
        claims: [PlaylinkTokenClaim.Client],
      };

      const token = fastify.jwt.sign(payload, {
        expiresIn: fastify.config.SESSION_TOKEN_EXPIRY,
      });

      await dispatch(fastify, payload.session, {
        type: "/device/token",
        data: {
          name,
          device: device.id,
        },
      });

      return await response.send({
        value: token,
        device: device.id,
        session: device.sessionId,
      });
    }

    return await response.badRequest();
  };
