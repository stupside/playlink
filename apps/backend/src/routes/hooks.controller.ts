import { FastifyInstance } from "fastify";

import sse from "../features/hook/sse";

const route = async (fastify: FastifyInstance) => {
  fastify.get("/sse", sse.Shorthand, sse.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/hooks" });
};
