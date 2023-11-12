import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import Hls from "hls.js";

import VideoQualityContext from "../../Base/Contexts/VideoQualityContext";

import { useVideoHls } from ".";

const VideoHlsQualityProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hls } = useVideoHls();

  const [quality, setQuality] = useState<number>(0);
  const [qualities, setQualities] = useState<
    ReadonlySet<{ id: number; name: string }>
  >(new Set());

  useEffect(() => {
    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      const map = data.levels.map((level, index) => ({
        id: index,
        name: level.name ?? `undefined${index}`,
      }));

      setQualities(new Set(map));
    });

    hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
      setQuality(data.level);
    });

    return () => {
      hls.off(Hls.Events.LEVEL_LOADED);
      hls.off(Hls.Events.MANIFEST_PARSED);
    };
  }, []);

  const changeQuality = useCallback(
    (quality?: number) => {
      if (quality) {
        const index = Array.from(qualities).findIndex(
          ({ id }) => id === quality,
        );

        hls.currentLevel = index;
      } else {
        hls.currentLevel = -1;
      }
    },
    [hls, qualities],
  );

  return (
    <VideoQualityContext.Provider
      value={{
        quality,
        qualities,
        changeQuality,
      }}
    >
      {children}
    </VideoQualityContext.Provider>
  );
};

export default VideoHlsQualityProvider;
