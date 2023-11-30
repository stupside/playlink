import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";

const Loader = Type.Object({
  key: Type.String(),
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { key } = Value.Decode(Loader, params);

  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/sessions/connect`,
    {
      method: "POST",
      headers: {
        ...request.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    }
  );

  const cookie = await storage.fromCookies(request, async (session) => {
    session.set("context", await response.json());

    return storage.commitSession(session);
  });

  return redirect("/app/client/setup", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
