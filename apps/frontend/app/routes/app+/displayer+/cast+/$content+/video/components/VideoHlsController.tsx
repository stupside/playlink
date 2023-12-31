import { type FC } from "react";

import { VideoController } from "@playlink/ui-content-video-hls";

import useUserAgent from "~/client/hooks/useUserAgent";

const VideoHlsController: FC = () => {
  const ua = useUserAgent();

  const isSmartTV = ua?.device?.type === "smarttv";

  return (
    <VideoController
      features={{
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
      }}
    />
  );
};

export default VideoHlsController;
