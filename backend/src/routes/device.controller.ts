import { FastifyInstance } from "fastify";

import { withPlaylinkToken, PlaylinkTokenClaim } from "../fastify";

import code from "../features/device/code";
import token from "../features/device/token";
import archive from "../features/device/archive";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/token", { schema: token.Schema }, token(fastify));

  await fastify.register(async (fastify) => {
    await withPlaylinkToken(fastify, [PlaylinkTokenClaim.Host]);

    fastify.get("/code", { schema: code.Schema }, code(fastify));

    fastify.post("/archive/:id", { schema: archive.Schema }, archive(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/devices" });
};
