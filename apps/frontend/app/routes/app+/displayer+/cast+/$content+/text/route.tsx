import { type FC } from "react";

import { useLoaderData } from "@remix-run/react";

import { type LoaderFunctionArgs, json } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/server/storage/session.server";
import { apiClient } from "~/server/api.server";

const Loader = Type.Object({
  content: Type.String(),
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context"),
  );

  const { content } = Value.Decode(Loader, params);

  const { data } = await apiClient(request).GET("/contents/{id}", {
    params: {
      path: {
        id: +content,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return json(data);
};

const PageComponent: FC = () => {
  const { value } = useLoaderData<typeof loader>();

  return (
    <article className="m-auto">
      <h1 className="text-4xl font-bold">{value}</h1>
    </article>
  );
};

export default PageComponent;
