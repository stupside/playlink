import { type FC } from "react";

import { json, useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import UAParser, { type IResult } from "ua-parser-js";

import { Video, VideoController } from "@playlink/ui-content-video";

import { apiClient } from "~/server/api.server";
import storage from "~/server/storage/session.server";

import UserAgentContext from "~/client/components/features/UserAgent";

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

  const agent = new UAParser(
    request.headers.get("User-Agent") ?? "Unknown",
  ).getResult();

  return json({
    agent,
    content: data,
  });
};

const PageComponent: FC = () => {
  const { content, agent } = useLoaderData<typeof loader>();

  if (content === undefined) return null;

  const Controller =
    useVideoController(content.subtype) ??
    (() => <VideoController features={{}} />);

  return (
    <UserAgentContext.Provider value={agent as IResult}>
      <Video url={content.value}>
        <Controller />
      </Video>
    </UserAgentContext.Provider>
  );
};

export default PageComponent;
