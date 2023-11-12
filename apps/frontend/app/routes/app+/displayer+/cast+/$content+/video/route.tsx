import { type FC, useMemo } from "react";

import { useLoaderData } from "@remix-run/react";

import { type LoaderFunctionArgs, json } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import {
  Video,
  VideoController as VideoControllerDefault,
  type IVideoController,
} from "@playlink/ui-content-video";

import { VideoController as VideoControllerHls } from "@playlink/ui-content-video-hls";

import storage from "~/server/storage/session.server";
import { apiClient } from "~/server/api.server";

import useUserAgent from "~/client/hooks/useUserAgent";

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
  const { value, subtype } = useLoaderData<typeof loader>();

  const controllers: Record<string, FC<IVideoController>> = {
    m3u8: VideoControllerHls,
    mp4: VideoControllerDefault,
  };

  const controller = useMemo(
    () => (subtype ? controllers[subtype] : undefined),
    [subtype],
  );

  const ua = useUserAgent();

  const isSmartTV = ua?.device?.type === "smarttv";

  if (controller) {
    return (
      <Video url={value}>
        {controller({
          features: {
            quality: {
              Provider: isSmartTV === false,
            },
            language: {
              Audio: false,
              Subtitle: false,
            },
            display: {
              pip: isSmartTV === false,
              fullscreen: isSmartTV === false,
            },
          },
        })}
      </Video>
    );
  }

  return (
    <article className="m-auto">
      <h1 className="text-3xl font-bold">Unsupported video type</h1>
    </article>
  );
};

export default PageComponent;
