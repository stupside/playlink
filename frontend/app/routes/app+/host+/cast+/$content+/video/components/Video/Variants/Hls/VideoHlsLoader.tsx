import { useLayoutEffect } from "react";

import Hls from "hls.js";

import { useVideoHls } from ".";

import { useVideo } from "../../VideoProvider";

export const VideoHlsLoader = () => {
  const { hls } = useVideoHls();

  const { url } = useVideo();

  useLayoutEffect(() => {
    if (Hls.isSupported()) {
      hls.loadSource(url);
    }
  }, [hls, url]);

  return null;
};
