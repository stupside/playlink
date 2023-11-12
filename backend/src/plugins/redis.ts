import fp from "fastify-plugin";
import redis from "@fastify/redis";

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(redis, {
    namespace: "publisher",
    url: fastify.config.REDIS_URL,
  });

  await fastify.register(redis, {
    namespace: "subscriber",
    url: fastify.config.REDIS_URL,
  });

  await fastify.register(redis, {
    namespace: "codes",
    url: fastify.config.REDIS_URL,
  });
});

export default plugin;
