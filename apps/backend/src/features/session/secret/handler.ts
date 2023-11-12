import { generateKeySync } from "crypto";

import QRCode from "qrcode";

import { MyRoute } from "../../../fastify";

import { Interface } from "./schema";

const REDIS_HASH_KEY_LEN = 16;

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) return await response.unauthorized();

    const key = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
      .export()
      .toString("hex");

    await fastify.redis.secrets?.setex(
      key,
      request.query.expiry,
      identity.session,
    );

    const redirection =
      request.query.redirection ??
      `${fastify.config.PLAYLINK_FRONTEND_CSR_URL}/api/connect`;

    const callback = `${redirection}/${encodeURIComponent(key)}`;

    const qr = await QRCode.toDataURL(callback, {
      errorCorrectionLevel: "M",
    });

    return await response.send({
      qr,
      raw: key,
      expiry: request.query.expiry,
    });
  };
