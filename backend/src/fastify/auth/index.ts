import { Static, Type } from "@sinclair/typebox";

export enum PlaylinkSessionType {
  Host = "host",
  Client = "client",
}

export const PlaylinkSessionSchema = Type.Object({
  type: Type.Enum(PlaylinkSessionType),
  device: Type.Number(),
  session: Type.Number(),
});

declare module "@fastify/request-context" {
  interface RequestContextData {
    playlink: Static<typeof PlaylinkSessionSchema>;
  }
}

export * from "./jwt";
