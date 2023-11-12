import { generateKeySync } from "crypto";

import QRCode from "qrcode";

import { MyRoute } from "../../../fastify";

import { Interface } from "./schema";

const REDIS_HASH_KEY_LEN = 16;

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const playlink = fastify.requestContext.get("playlink");

    if (playlink === undefined) return await response.unauthorized();

    const key = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
      .export()
      .toString("hex");

    await fastify.redis.codes.setex(
      key,
      request.query.expiry,
      playlink.session
    );

    const redirection =
      request.query.redirection ??
      `${fastify.config.PLAYLINK_FRONTEND_CSR_URL}/api/auth/connect`;

    const callback = `${redirection}/${encodeURIComponent(key)}`;

    const qr = await QRCode.toDataURL(callback);

    return await response.send({
      qr,
      raw: key,
      expiry: request.query.expiry,
    });
  };
