import fp from "fastify-plugin";

import env from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {

    config: {
      PORT: number,
      DATABASE_URL: string,
      FRONTEND_URL: string,
      JWT_SECRET: string,
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
    required: ["PORT", "DATABASE_URL", "FRONTEND_URL", "JWT_SECRET"],
    properties: {
      PORT: {
        type: "integer",
        default: 3000
      },
      FRONTEND_URL: {
        type: "string"
      },
      DATABASE_URL: {
        type: "string"
      },
      JWT_SECRET: {
        type: "string",
      }
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

