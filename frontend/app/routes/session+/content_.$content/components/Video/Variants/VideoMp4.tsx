import { FC } from "react";

import Video, { type IVideoController } from "..";

const VideoMp4: FC<IVideoController> = ({
  title,
  features: { play, fullscreen, pip, timeline, volume },
}) => {
  return (
    <Video.Controller
      title={title}
      features={{
        play,
        fullscreen,
        pip,
        timeline,
        volume,
        providers: {
          QualityProvider: undefined,
          LanguageProvider: {
            AudioProvider: undefined,
            SubtitleProvider: undefined,
          },
        },
      }}
    />
  );
};

export default VideoMp4;
