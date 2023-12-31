import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({
  ip: Type.Optional(Type.String({ description: "The ip of the device" })),
  agent: Type.Optional(
    Type.String({ description: "The agent attached to the device" }),
  ),
});

const Reply = Type.Object({
  token: Type.String({ description: "The token for the session" }),
  device: Type.Number({ description: "The id of the device" }),
  session: Type.Number({ description: "The id of the session" }),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  description: "Create a session.",
  body: Body,
  response: {
    200: Reply,
  },
};
