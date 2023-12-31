import type { FC } from "react";

import VideoHlsController from "./VideoHlsController";

const VideoControllerMapping: Array<{
  Controller: FC;
  subtypes: string[];
}> = [
  {
    subtypes: ["m3u8", "m3u"],
    Controller: VideoHlsController,
  },
];

const useVideoController = (subtype: string) => {
  const { Controller } = VideoControllerMapping.find(({ subtypes }) =>
    subtypes.includes(subtype),
  ) || { Controller: undefined };

  return Controller;
};

export { useVideoController };
