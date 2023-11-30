import { LoaderFunctionArgs, json } from "@remix-run/node";

import { FC } from "react";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";

import Center from "~/components/Center";

const Loader = Type.Object({
  value: Type.String(),
  type: Type.String(),
  subtype: Type.Optional(Type.String()),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context")
  );

  const url = new URL(request.url);

  const content = Object.fromEntries(url.searchParams);

  const { value, type, subtype } = Value.Decode(Loader, content);

  await fetch(`${process.env.PLAYLINK_BACKEND_URL}/contents/cast`, {
    method: "POST",
    headers: {
      ...request.headers,
      "Content-Type": "application/json",
      [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
    },
    body: JSON.stringify({
      type,
      value,
      subtype,
    }),
  });

  return new Response(null);
};

const PageComponent: FC = () => {
  return <Center>Casted</Center>;
};

export default PageComponent;
