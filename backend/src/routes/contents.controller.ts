import { FastifyInstance } from "fastify";

import { requirePlaylinkToken, PlaylinkSessionType } from "../fastify";

import cast from "../features/content/cast";
import retrieve from "../features/content/retrieve";

const route = async (fastify: FastifyInstance) => {
  await fastify.register(async (fastify) => {
    await requirePlaylinkToken(fastify, [PlaylinkSessionType.Client]);

    fastify.post("/cast", { schema: cast.Schema }, cast(fastify));
  });

  await fastify.register(async (fastify) => {
    await requirePlaylinkToken(fastify, [
      PlaylinkSessionType.Client,
      PlaylinkSessionType.Host,
    ]);

    fastify.get("/:id", { schema: retrieve.Schema }, retrieve(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/contents" });
};
