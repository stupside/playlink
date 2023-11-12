import { FastifySchema, RequestGenericInterface } from "fastify";

import {
  PlaylinkTokenHeader,
  PlaylinkTokenHeaderSchema,
} from "../../../fastify";

export interface Interface extends RequestGenericInterface {
  Headers: PlaylinkTokenHeader;
}

export const Schema: FastifySchema = {
  tags: ["sessions"],
  description: "Listen for session events.",
  headers: PlaylinkTokenHeaderSchema,
};
