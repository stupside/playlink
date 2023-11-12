import { FastifyInstance } from "fastify";

import { requirePlaylinkToken, PlaylinkSessionType } from "../fastify";

import sse from "../features/hook/sse";

const route = async (fastify: FastifyInstance) => {
  await fastify.register(async (fastify) => {
    await requirePlaylinkToken(fastify, [PlaylinkSessionType.Host]);

    fastify.get("/sse", { schema: sse.Schema }, sse(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/hooks" });
};
