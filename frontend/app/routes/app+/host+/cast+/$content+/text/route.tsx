import { FC, useMemo } from "react";

import { useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs, json } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";
import Center from "~/components/Center";

const Loader = Type.Object({
  content: Type.String(),
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context")
  );

  const { content } = Value.Decode(Loader, params);

  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/contents/${content}`,
    {
      method: "GET",
      headers: {
        ...request.headers,
        [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
      },
    }
  );

  return json(
    (await response.json()) as {
      value: string;
    }
  );
};

const PageComponent: FC = () => {
  const { value } = useLoaderData<typeof loader>();

  return (
    <Center>
      <h1 className="text-4xl font-bold">{value}</h1>
    </Center>
  );
};

export default PageComponent;
