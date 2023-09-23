import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-jwt
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(jwt, {
        secret: "?!Y8eL40l+_UxPVr", // TODO: change secret
    });
});

export default plugin;

