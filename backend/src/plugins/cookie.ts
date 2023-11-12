import fp from "fastify-plugin";

import cookie from "@fastify/cookie";

/**
 * This plugins adds some utilities support cookies
 *
 * @see https://github.com/fastify/fastify-cookie
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(cookie, {
    prefix: "__playlink",
    parseOptions: {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
    },
    secret: [],
  });
});

export default plugin;
