import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  token: Type.String(),
  device: Type.Number({ description: "The id of the device" }),
  session: Type.Number({ description: "The id of the session" }),
});

export interface Interface extends RequestGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["sessions"],
  description: "Create a new sessions.",
};
