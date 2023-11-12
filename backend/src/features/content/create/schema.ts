import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import {
  PlaylinkTokenHeader,
  PlaylinkTokenHeaderSchema,
} from "../../../fastify";

const Body = Type.Object({
  value: Type.String({ description: "The value of the media." }),
  type: Type.String({
    description: "The type of the content the url is pointing to.",
  }),
});

export interface Interface extends RequestGenericInterface {
  Headers: PlaylinkTokenHeader;
  Body: Static<typeof Body>;
}

export const Schema: FastifySchema = {
  tags: ["contents"],
  headers: PlaylinkTokenHeaderSchema,
  description: "Create a content.",
  body: Body,
};
