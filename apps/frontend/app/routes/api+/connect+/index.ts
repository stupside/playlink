import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { apiClient } from "~/server/api.server";

import storage from "~/server/storage/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data, response } = await apiClient(request).POST("/sessions", {
    body: {
      ip: "unknown",
      agent: "unknown",
    },
  });

  if (data === undefined) return response;

  const cookie = await storage.fromCookies(request, async (session) => {
    session.set("context", data);

    return storage.commitSession(session);
  });

  return redirect("/app/displayer/secret", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
