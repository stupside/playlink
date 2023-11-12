import createClient from "openapi-fetch";

import type { paths } from "types/api.server";

export const apiClient = (request: Request) => {
  return createClient<paths>({
    signal: request.signal,
    headers: request.headers,
    baseUrl: process.env.PLAYLINK_BACKEND_URL,
  });
};
