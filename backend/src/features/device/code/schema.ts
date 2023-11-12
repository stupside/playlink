import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import {
  PlaylinkTokenHeader,
  PlaylinkTokenHeaderSchema,
} from "../../../fastify";

const Query = Type.Object({
  expiry: Type.Number({
    minimum: 15,
    maximum: 120,
    default: 15,
    description: "When will the returned code expire.",
  }),
});

const Reply = Type.Object({
  qr: Type.String({ description: "The qr code wrapping the hash." }),
  key: Type.String({ description: "The hash wrapped in the qr code." }),
  code: Type.String({
    description: "A code that can be used to generate a token.",
  }),
  expiry: Type.Number({ description: "From now, when will the code expire" }),
});

export interface Interface extends RequestGenericInterface {
  Headers: PlaylinkTokenHeader;
  Querystring: Static<typeof Query>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["devices"],
  description:
    "Generate a unique code and qr code to retrieve a long lived token.",
  headers: PlaylinkTokenHeaderSchema,
  querystring: Query,
  response: {
    200: Reply,
  },
};
