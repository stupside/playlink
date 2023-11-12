import { Type } from "@sinclair/typebox";

import hook from "./hook";

const PLAYLINK_SESSION_TOKEN_KEY = "x-playlink-token";

export const PlaylinkSessionHeaderSchema = Type.Object({
  [PLAYLINK_SESSION_TOKEN_KEY]: Type.String(),
});

export { hook as requirePlaylinkToken };
