import fp from "fastify-plugin";

import env from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {

    config: {
      PORT: number,
      DATABASE_URL: string,
      FRONTEND_URL: string,
      JWT_SECRET: string,
      REDIS_URL: string,
    };
  }
}

/**
 * This plugins to work with .env.X
 *
 * @see https://github.com/fastify/fastify-env
 */
const plugin = fp(async (fastify, _) => {

  const schema = {
    type: "object",
    required: ["PORT", "DATABASE_URL", "JWT_SECRET", "REDIS_URL", "FRONTEND_URL"],
    properties: {
      PORT: {
        type: "integer",
      },
      DATABASE_URL: {
        type: "string"
      },
      JWT_SECRET: {
        type: "string",
      },
      REDIS_URL: {
        type: "string",
      },
      FRONTEND_URL: {
        type: "string",
      },
    }
  }

  const options = {
    schema: schema,
    dotenv: true,
    data: process.env
  }

  await fastify.register(env, options);
});

export default plugin;

