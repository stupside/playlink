import { FastifySchema, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import { PlaylinkSessionHeaderSchema } from "../../../fastify";

enum ContentType {
  Video = "video",
  Text = "text",
}

const Body = Type.Object({
  value: Type.String({ description: "The value of the content." }),
  type: Type.Enum(ContentType, {
    description: "The type of the content.",
  }),
  subtype: Type.Optional(
    Type.String({
      description: "The subtype of the content.",
    })
  ),
});

export interface Interface extends RequestGenericInterface {
  Headers: Static<typeof PlaylinkSessionHeaderSchema>;
  Body: Static<typeof Body>;
}

export const Schema: FastifySchema = {
  tags: ["content"],
  headers: PlaylinkSessionHeaderSchema,
  description: "Create a content.",
  body: Body,
};
