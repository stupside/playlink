import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import storage from "~/storage";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/sessions/host`,
    {
      method: "POST",
      headers: {
        ...request.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: "unknown",
        agent: "unknown",
      }),
    }
  );

  const cookie = await storage.fromCookies(request, async (session) => {
    session.set("context", await response.json());

    return storage.commitSession(session);
  });

  return redirect("/app/host/secret", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
