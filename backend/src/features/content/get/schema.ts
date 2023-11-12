import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import {
  PlaylinkTokenHeader,
  PlaylinkTokenHeaderSchema,
} from "../../../fastify";

const Params = Type.Object({
  id: Type.Number({ description: "The id of the content." }),
});

export interface Interface extends RequestGenericInterface {
  Headers: PlaylinkTokenHeader;
  Params: Static<typeof Params>;
}

export const Schema: FastifySchema = {
  tags: ["contents"],
  headers: PlaylinkTokenHeaderSchema,
  description: "Get a content.",
  params: Params,
};
