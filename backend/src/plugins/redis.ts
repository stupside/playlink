import fp from "fastify-plugin";
import redis from "@fastify/redis";

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
const plugin = fp(async (fastify, _) => {

    const options = {
        host: fastify.config.REDIS_HOST,
        port: fastify.config.REDIS_PORT,
        password: fastify.config.REDIS_PASSWORD
    };

    await fastify.register(redis, {
        namespace: "pub",
        ...options
    });

    await fastify.register(redis, {
        namespace: "sub",
        ...options
    })
});

export default plugin;

