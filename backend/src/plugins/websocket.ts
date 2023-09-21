import fp from "fastify-plugin";
import websocket from "@fastify/websocket";

/**
 * This plugins adds websocket
 *
 * @see https://github.com/fastify/fastify-websocket
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(websocket);
});

export default plugin;

