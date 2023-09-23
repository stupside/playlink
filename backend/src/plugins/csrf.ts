import fp from "fastify-plugin";
import csrf from "@fastify/csrf-protection";

/**
 * This plugins adds cookie
 *
 * @see https://github.com/fastify/csrf-protection
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(csrf, {
        sessionPlugin: "@fastify/cookie",
        cookieOpts: {
            signed: true,
        },
        csrfOpts: { hmacKey: 'somekey' }
    });
});

export default plugin;

