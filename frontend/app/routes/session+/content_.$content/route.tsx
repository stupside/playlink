import { FC, useMemo } from "react";

import { LoaderFunctionArgs, json } from "@remix-run/node";

import { useLoaderData, useNavigate } from "@remix-run/react";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";

import { getContent } from "~/bff/contents.server";

import useSse from "~/hooks/sse/useSse";

import Video from "./components/Video";

const Loader = Type.Object({
  content: Type.String(),
});

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const content = await storage.fromCookies(request, async (session) => {
    const token = storage.requireValue(session, "token");

    const { content } = Value.Decode(Loader, params);

    return getContent(content, token.value);
  });

  return json(content);
};

const PageComponent: FC = () => {
  const { value, type } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/content/create",
      handler: async (content) => {
        navigate(`/session/content/${content.id}`);
      },
    },
  });

  const variant = useMemo(() => {
    switch (type) {
      case "m3u8":
        return <Video.Variants.Hls features={{}} />;
      case "mp4":
        return <Video.Variants.Mp4 features={{}} />;
      default:
        return <span>Unsupported media type</span>;
    }
  }, [type]);

  return <Video url={value}>{variant}</Video>;
};

export default PageComponent;
