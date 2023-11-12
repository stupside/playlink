import fp from "fastify-plugin";

import env, { FastifyEnvOptions } from "@fastify/env";

import { Type, Static } from "@sinclair/typebox";

const Schema = Type.Object({
  PORT: Type.Number(),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
  REDIS_URL: Type.String(),
  PLAYLINK_FRONTEND_SSR_URL: Type.String(),
  PLAYLINK_FRONTEND_CSR_URL: Type.String(),
  SESSION_TOKEN_EXPIRY: Type.String(),
});

type SchemaType = Static<typeof Schema>;

declare module "fastify" {
  interface FastifyInstance {
    config: SchemaType;
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
