import { useCallback } from "react";

import { useVideo } from "../../../VideoProvider";

const useVideoPip = () => {
  const { video } = useVideo();

  const toggle = useCallback(() => {
    if (video.current) {
      video.current.requestPictureInPicture();
    }
  }, [video.current]);

  return toggle;
};

export default useVideoPip;
