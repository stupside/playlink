import {
  FC,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import Hls from "hls.js";

import VideoSubtitleContext from "../../../Base/Contexts/VideoSubtitleContext";

import { useVideoHls } from "..";

const VideoHlsSubtitleProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hls } = useVideoHls();

  const [subtitle, setSubtitle] = useState<number>(0);
  const [subtitles, setSubtitles] = useState<
    ReadonlySet<{ id: number; name: string }>
  >(new Set());

  useLayoutEffect(() => {
    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      const map = data.subtitleTracks?.map((subtitle) => ({
        id: subtitle.id,
        name: subtitle.name,
      }));

      setSubtitles(new Set(map));
    });

    hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, (_, data) => {
      setSubtitle(data.id);
    });

    return () => {
      hls.off(Hls.Events.MANIFEST_PARSED);
      hls.off(Hls.Events.SUBTITLE_TRACK_LOADED);
    };
  }, []);

  const changeSubtitle = useCallback(
    (subtitle?: number) => {
      if (subtitle) {
        const index = Array.from(subtitles).findIndex(
          ({ id }) => id === subtitle
        );

        hls.subtitleDisplay = true;
        hls.subtitleTrack = index;
      } else {
        hls.subtitleDisplay = false;
      }
    },
    [subtitles]
  );

  return (
    <VideoSubtitleContext.Provider
      value={{
        subtitle,
        subtitles,
        changeSubtitle,
      }}
    >
      {children}
    </VideoSubtitleContext.Provider>
  );
};

export default VideoHlsSubtitleProvider;
