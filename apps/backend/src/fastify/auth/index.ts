import { type Static, Type } from "@sinclair/typebox";

export const PlaylinkSessionSchema = Type.Object({
  device: Type.Number(),
  session: Type.Number(),
  claims: Type.Array(Type.String()),
});

declare module "@fastify/request-context" {
  interface RequestContextData {
    identity: Static<typeof PlaylinkSessionSchema>;
  }
}

export * from "./bearer";
