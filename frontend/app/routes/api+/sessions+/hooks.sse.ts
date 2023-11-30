import { LoaderFunctionArgs } from "@remix-run/node";

import storage from "~/storage";

const ENDPOINT = `${process.env.PLAYLINK_BACKEND_URL}/hooks/sse`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) => {
    return storage.requireValue(session, "context");
  });

  request.headers.append(process.env.PLAYLINK_TOKEN_HEADER_KEY!, token);

  return fetch(ENDPOINT, request);
};
