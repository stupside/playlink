import { type FastifyInstance } from "fastify";

import cast from "../features/content/cast";
import retrieve from "../features/content/retrieve";

const route = async (fastify: FastifyInstance) => {
  fastify.post("", cast.Shorthand, cast.Route(fastify));
  fastify.get("/:id", retrieve.Shorthand, retrieve.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/contents" });
};
