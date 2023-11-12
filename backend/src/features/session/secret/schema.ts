import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import { PlaylinkSessionHeaderSchema } from "../../../fastify";

const Query = Type.Object({
  expiry: Type.Number({
    minimum: 15,
    maximum: 240,
    default: 30,
    description: "When will the returned key expire, in seconds.",
  }),
  redirection: Type.Optional(
    Type.String({
      description: "Where the qr code should redirect the user to.",
    })
  ),
});

const Reply = Type.Object({
  qr: Type.String({ description: "The qr code wrapping the hash." }),
  raw: Type.String({ description: "The key to retrieve a long lived token." }),
  expiry: Type.Number({ description: "From now, when will the code expire." }),
});

export interface Interface extends RequestGenericInterface {
  Headers: Static<typeof PlaylinkSessionHeaderSchema>;
  Querystring: Static<typeof Query>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  description: "Generate a unique key to retrieve a long lived token.",
  headers: PlaylinkSessionHeaderSchema,
  querystring: Query,
  response: {
    200: Reply,
  },
};
