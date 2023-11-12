import { FastifyInstance } from "fastify";

import { withPlaylinkToken, PlaylinkTokenClaim } from "../fastify";

import get from "../features/content/get";
import create from "../features/content/create";

const route = async (fastify: FastifyInstance) => {
  await fastify.register(async (fastify) => {
    await withPlaylinkToken(fastify, [PlaylinkTokenClaim.Client]);

    fastify.post("/", { schema: create.Schema }, create(fastify));
  });

  await fastify.register(async (fastify) => {
    await withPlaylinkToken(fastify, [
      PlaylinkTokenClaim.Client,
      PlaylinkTokenClaim.Host,
    ]);

    fastify.get("/:id", { schema: get.Schema }, get(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/contents" });
};
