import { Static, Type } from "@sinclair/typebox";

import { PlaylinkToken } from ".";

export const PLAYLINK_TOKEN_HEADER_KEY = "x-playlink-token";

export const PlaylinkTokenHeaderSchema = Type.Object({
  [PLAYLINK_TOKEN_HEADER_KEY]: Type.String(),
});

export type PlaylinkTokenHeader = Static<typeof PlaylinkTokenHeaderSchema>;

declare module "@fastify/request-context" {
  interface RequestContextData {
    [PLAYLINK_TOKEN_HEADER_KEY]: PlaylinkToken;
  }
}
