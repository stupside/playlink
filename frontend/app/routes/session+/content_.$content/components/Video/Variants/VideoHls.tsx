import { FC } from "react";

import Video, { type IVideoController } from "..";

import VideoHlsProvider from "./Hls";

import { VideoHlsLoader } from "./Hls/VideoHlsLoader";

import VideoHlsQualityProvider from "./Hls/VideoHlsQualityProvider";

import VideoHlsAudioProvider from "./Hls/Language/VideoHlsAudioProvider";
import VideoHlsSubtitleProvider from "./Hls/Language/VideoHlsSubtitleProvider";

const VideoHls: FC<IVideoController> = ({
  title,
  features: {
    play,
    fullscreen,
    pip,
    timeline,
    volume,
    providers = {
      QualityProvider: true,
      LanguageProvider: {
        AudioProvider: true,
        SubtitleProvider: true,
      },
    },
  },
}) => {
  return (
    <VideoHlsProvider config={{}}>
      <Video.Controller
        title={title}
        features={{
          play,
          fullscreen,
          pip,
          timeline,
          volume,
          providers: {
            QualityProvider: providers?.QualityProvider
              ? VideoHlsQualityProvider
              : undefined,
            LanguageProvider: {
              AudioProvider: providers?.LanguageProvider?.AudioProvider
                ? VideoHlsAudioProvider
                : undefined,
              SubtitleProvider: providers?.LanguageProvider?.SubtitleProvider
                ? VideoHlsSubtitleProvider
                : undefined,
            },
          },
        }}
      >
        <VideoHlsLoader />
      </Video.Controller>
    </VideoHlsProvider>
  );
};

export default VideoHls;
