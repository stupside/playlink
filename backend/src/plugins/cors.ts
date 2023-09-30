import fp from "fastify-plugin";
import cors from "@fastify/cors";

/**
 * This plugins adds cors policies ability
 *
 * @see https://github.com/fastify/fastify-cors
 */
const plugin = fp(async (fastify, _) => {

    const urls = [fastify.config.FRONTEND_URL];

    await fastify.register(cors, {
        origin: urls,
        methods: ['GET', 'POST', 'OPTION'],
        credentials: true
    });
});

export default plugin;

