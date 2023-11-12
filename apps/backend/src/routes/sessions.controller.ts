import { FastifyInstance } from "fastify";

import secret from "../features/session/secret";
import create from "../features/session/create";
import connect from "../features/session/connect";

const route = async (fastify: FastifyInstance) => {
  fastify.get("", secret.Shorthand, secret.Route(fastify));
  fastify.post("", create.Shorthand, create.Route(fastify));
  fastify.post("/connect", connect.Shorthand, connect.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
