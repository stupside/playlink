import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-jwt
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(jwt, {
    secret: Buffer.from(fastify.config.PLAYLINK_JWT_SECRET, "hex"),
    sign: {
      iss: "playlink",
      aud: "playlink.aud",
      expiresIn: fastify.config.PLAYLINK_JWT_EXPIRY,
    },
  });
});

export default plugin;
