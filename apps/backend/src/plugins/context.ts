import fp from "fastify-plugin";

import { fastifyRequestContext } from "@fastify/request-context";

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-reverse-context
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(fastifyRequestContext, {});
});

export default plugin;
