import { type FC } from "react";

import { json, useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import { Video, VideoController } from "@playlink/ui-content-video";

import { apiClient } from "~/server/api.server";
import storage from "~/server/storage/session.server";

import { useVideoController } from "./components";

const Loader = Type.Object({
  content: Type.String(),
});

const loader = async ({ request, params }: LoaderFunctionArgs) => {
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
  const { value, subtype } = useLoaderData<typeof loader>();

  const Controller =
    useVideoController(subtype) ?? (() => <VideoController features={{}} />);

  return (
    <Video url={value}>
      <Controller />
    </Video>
  );
};

export default PageComponent;
