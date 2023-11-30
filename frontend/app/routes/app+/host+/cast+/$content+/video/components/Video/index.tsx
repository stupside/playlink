import Controller, { VideoControllerFeatures } from "./Base/Controller";

import VideoProvider from "./VideoProvider";

import { VideoHls, VideoMp4 } from "./Variants";

import { ComponentProps } from "react";

export type VideoMediaType = "mp4" | "m3u8";

type IVideoController = Omit<
  ComponentProps<typeof Controller>,
  "features" | "children"
> & {
  features: VideoControllerFeatures<boolean>;
};

export type { IVideoController };

export default Object.assign(VideoProvider, {
  Controller: Controller,
  Variants: {
    Hls: VideoHls,
    Mp4: VideoMp4,
  },
});
