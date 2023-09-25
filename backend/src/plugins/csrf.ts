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
            secure: true,
        },
        csrfOpts: { hmacKey: 'bGoa+V7g/yqDXvKRqq+JTFn4uQZbPiQJo4pf9RzJ' }
    });
});

export default plugin;

