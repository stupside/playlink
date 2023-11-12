import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import { PlaylinkSessionHeaderSchema } from "../../../fastify";

const Params = Type.Object({
  id: Type.Number({ description: "The id of the content." }),
});

export interface Interface extends RequestGenericInterface {
  Headers: Static<typeof PlaylinkSessionHeaderSchema>;
  Params: Static<typeof Params>;
}

export const Schema: FastifySchema = {
  tags: ["content"],
  headers: PlaylinkSessionHeaderSchema,
  description: "Get a content.",
  params: Params,
};
