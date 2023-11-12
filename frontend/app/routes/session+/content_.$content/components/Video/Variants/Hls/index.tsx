import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import Hls, { HlsConfig } from "hls.js";

import { useVideo } from "../../VideoProvider";

interface IVideoHlsContext {
  hls: Hls;
}

const VideoHlsContext = createContext<IVideoHlsContext>({} as IVideoHlsContext);

export const useVideoHls = () => useContext(VideoHlsContext);

const VideoHlsProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: Partial<HlsConfig>;
}) => {
  const { video } = useVideo();

  const [hls, setHls] = useState<Hls>();

  useLayoutEffect(() => {
    setHls((old) => {
      old?.destroy();

      if (Hls.isSupported()) {
        return new Hls({ enableWebVTT: false, ...config });
      } else {
        return undefined;
      }
    });
  }, [config]);

  useEffect(() => {
    if (video.current) {
      if (hls) {
        hls.attachMedia(video.current);
      }
    }
  }, [video.current, hls]);

  if (hls)
    return (
      <VideoHlsContext.Provider value={{ hls }}>
        {children}
      </VideoHlsContext.Provider>
    );

  return null;
};

export default VideoHlsProvider;
