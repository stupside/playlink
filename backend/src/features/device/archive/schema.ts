import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import {
  PlaylinkTokenHeader,
  PlaylinkTokenHeaderSchema,
} from "../../../fastify";

const Params = Type.Object({
  id: Type.Number({
    description: "The device id.",
  }),
});

const Body = Type.Object({
  archive: Type.Boolean({
    description: "Should the device be archived.",
  }),
});

export interface Interface extends RequestGenericInterface {
  Headers: PlaylinkTokenHeader;
  Params: Static<typeof Params>;
  Body: Static<typeof Body>;
}

export const Schema: FastifySchema = {
  tags: ["devices"],
  description: "Archive a device. Archived devices cannot be used anymore.",
  headers: PlaylinkTokenHeaderSchema,
  params: Params,
  body: Body,
};
