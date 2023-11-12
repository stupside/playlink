import { randomInt, generateKeySync } from "crypto";

import QRCode from "qrcode";

import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

const MIN_CODE = 1000;
const MAX_CODE = 9999;

const REDIS_HASH_KEY_LEN = 128;

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const token = fastify.requestContext.get("x-playlink-token");

    if (token === undefined) return await response.unauthorized();

    const session = await prisma.session.findUniqueOrThrow({
      where: {
        id: token.session,
      },
    });

    const key = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
      .export()
      .toString("base64");

    const code = randomInt(MIN_CODE, MAX_CODE).toString();

    const value = JSON.stringify({
      code,
      session: session.id,
    });

    await fastify.redis.codes.setex(key, request.query.expiry, value);

    await dispatch(fastify, session.id, {
      type: "/device/code",
      data: {
        key,
        code,
      },
    });

    const callback = `${
      fastify.config.PLAYLINK_FRONTEND_CSR_URL
    }/device/connect/${encodeURIComponent(key)}`;

    const qr = await QRCode.toDataURL(callback);

    return await response.send({
      qr,
      key,
      code,
      expiry: request.query.expiry,
    });
  };
