import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static } from "@sinclair/typebox";

import { PlaylinkSessionHeaderSchema } from "../../../fastify";

export interface Interface extends RequestGenericInterface {
  Headers: Static<typeof PlaylinkSessionHeaderSchema>;
}

export const Schema: FastifySchema = {
  tags: ["hook"],
  description: "Sse endpoint to listen for session events.",
  headers: PlaylinkSessionHeaderSchema,
};
