import { type LoaderFunctionArgs, redirect } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/server/storage/session.server";
import { apiClient } from "~/server/api.server";

const Loader = Type.Object({
  key: Type.String(),
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { key } = Value.Decode(Loader, params);

  const { data, response } = await apiClient(request).POST(
    "/sessions/connect",
    {
      body: {
        key,
        device: {
          ip: undefined,
          agent: request.headers.get("user-agent") ?? undefined,
        }
      },
    },
  );

  if (data === undefined) return response;

  const cookie = await storage.fromCookies(request, async (session) => {
    session.set("context", data);

    return storage.commitSession(session);
  });

  return redirect("/app/caster/setup", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
