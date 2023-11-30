import { FC, useMemo } from "react";

import { useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs, json } from "@remix-run/node";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";

import Video, { IVideoController } from "./components/Video";

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
      type: string;
      subtype?: string;
    }
  );
};

const controllers: Record<string, FC<IVideoController>> = {
  mp4: Video.Variants.Mp4,
  m3u8: Video.Variants.Hls,
};

const PageComponent: FC = () => {
  const { value, subtype } = useLoaderData<typeof loader>();

  const controller = useMemo(
    () => (subtype ? controllers[subtype] : undefined),
    [subtype]
  );

  if (controller)
    return <Video url={value}>{controller({ features: {} })}</Video>;

  return <span>Unsupported video type</span>;
};

export default PageComponent;
