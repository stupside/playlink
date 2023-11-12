import { Static, Type } from "@sinclair/typebox";

export * from "./header";

import hook from "./hook";

enum PlaylinkTokenClaim {
  Host = "host",
  Client = "client",
}

type PlaylinkToken = Static<typeof PlaylinkTokenSchema>;

const PlaylinkTokenSchema = Type.Object({
  device: Type.Number(),
  session: Type.Number(),
  claims: Type.Array(Type.Enum(PlaylinkTokenClaim)),
});

export {
  PlaylinkToken,
  PlaylinkTokenClaim,
  PlaylinkTokenSchema,
  hook as withPlaylinkToken,
};
