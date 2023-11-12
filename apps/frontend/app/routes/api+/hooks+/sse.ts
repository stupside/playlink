import { LoaderFunctionArgs } from "@remix-run/node";

import storage from "~/server/storage/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) => {
    return storage.requireValue(session, "context");
  });

  request.headers.set("Authorization", `Bearer ${token}`);

  // TODO: This is a hack to get around the fact that the openapi-fetch client doesn't support SSE.

  return await fetch(`${process.env.PLAYLINK_BACKEND_URL}/hooks/sse`, request);
};
