import { type LoaderFunctionArgs } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/server/storage/session.server";
import { apiClient } from "~/server/api.server";

const Loader = Type.Object({
  type: Type.Enum({
    text: "text",
    video: "video",
    image: "image",
  }),
  value: Type.String(),
  subtype: Type.Optional(Type.String()),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context"),
  );

  const url = new URL(request.url);

  const content = Object.fromEntries(url.searchParams);

  const { value, type, subtype } = Value.Decode(Loader, content);

  const { response } = await apiClient(request).POST("/contents", {
    body: {
      type,
      value,
      subtype,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
