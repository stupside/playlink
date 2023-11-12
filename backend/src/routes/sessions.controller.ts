import { FastifyInstance } from "fastify";

import { requirePlaylinkToken, PlaylinkSessionType } from "../fastify";

import host from "../features/session/host";
import secret from "../features/session/secret";
import connect from "../features/session/connect";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/host", { schema: host.Schema }, host(fastify));
  fastify.post("/connect", { schema: connect.Schema }, connect(fastify));

  await fastify.register(async (fastify) => {
    await requirePlaylinkToken(fastify, [PlaylinkSessionType.Host]);

    fastify.get("/secret", { schema: secret.Schema }, secret(fastify));
  });
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
