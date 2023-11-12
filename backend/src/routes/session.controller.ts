import { FastifyInstance } from "fastify";

import { withPlaylinkToken, PlaylinkTokenClaim } from "../fastify";

import host from "../features/session/host";

import sse from "../features/session/sse";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/", { schema: host.Schema }, host(fastify));

  await fastify.register(async (fastify) => {
    await withPlaylinkToken(fastify, [
      PlaylinkTokenClaim.Host,
      PlaylinkTokenClaim.Client,
    ]);

    fastify.get("/sse", { schema: sse.Schema }, sse(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
