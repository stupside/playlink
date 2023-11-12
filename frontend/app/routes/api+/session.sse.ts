import { LoaderFunctionArgs } from "@remix-run/node";

import storage from "~/storage";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sse = storage.fromCookies(request, async (session) => {
    const token = storage.requireValue(session, "token");

    const url = `${process.env.PLAYLINK_BACKEND_URL}/sessions/sse`;

    const proxy = new Request(url, request);

    // The token is stored in a cookie. This is an attempt to proxy the sse endpoint. It's not suitable.
    proxy.headers.append(process.env.PLAYLINK_TOKEN_HEADER_KEY!, token.value);

    return fetch(proxy, { signal: request.signal });
  });

  return sse;
};
