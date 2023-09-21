import fp from "fastify-plugin";
import cors from "@fastify/cors";

/**
 * This plugins adds cors policies ability
 *
 * @see https://github.com/fastify/fastify-cors
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(cors);
});

export default plugin;

