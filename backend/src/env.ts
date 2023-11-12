import fp from "fastify-plugin";

import env, { FastifyEnvOptions } from "@fastify/env";

import { Type, Static } from "@sinclair/typebox";

const Schema = Type.Object({
  PORT: Type.Number(),
  PLAYLINK_DATABASE_URL: Type.String(),
  PLAYLINK_JWT_SECRET: Type.String(),
  PLAYLINK_REDIS_URL: Type.String(),
  PLAYLINK_FRONTEND_SSR_URL: Type.String(),
  PLAYLINK_FRONTEND_CSR_URL: Type.String(),
  PLAYLINK_JWT_EXPIRY: Type.String(),
});

declare module "fastify" {
  interface FastifyInstance {
    config: Static<typeof Schema>;
  }
}

/**
 * This plugins to work with .env.X
 *
 * @see https://github.com/fastify/fastify-env
 */
const plugin = fp(async (fastify, _) => {
  const options: FastifyEnvOptions = {
    dotenv: true,
    schema: Schema,
    data: process.env,
  };

  await fastify.register(env, options);
});

export default plugin;
