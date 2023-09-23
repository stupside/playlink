import fp from "fastify-plugin";
import cookie from "@fastify/cookie";

/**
 * This plugins adds cookie
 *
 * @see https://github.com/fastify/fastify-cookie
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(cookie, {
        secret: "somesecret"
    });
});

export default plugin;

