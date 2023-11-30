import { useCallback, useLayoutEffect } from "react";

import { atom, useRecoilState } from "recoil";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import { PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/24/solid";

import { useVideo } from "../../VideoProvider";

const VideoState_Paused = atom<boolean>({
  key: "VideoState_Paused",
  default: true,
});

const VideoPause = () => {
  const { video } = useVideo();

  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  const [paused, setPaused] = useRecoilState(VideoState_Paused);

  useLayoutEffect(() => {
    const { current } = video;

    const onPause = () => {
      setPaused(true);
    };

    const onPlay = () => {
      setPaused(false);
    };

    current?.addEventListener("play", onPlay);
    current?.addEventListener("pause", onPause);

    return () => {
      current?.removeEventListener("play", onPlay);
      current?.removeEventListener("pause", onPause);
    };
  }, [video.current]);

  const togglePaused = useCallback(() => {
    if (video.current?.paused) {
      video?.current?.play();
    } else {
      video?.current?.pause();
    }
  }, [video.current]);

  return (
    <button
      title="play"
      type="button"
      ref={ref}
      id="play"
      onClick={togglePaused}
    >
      {paused ? <Play /> : <Pause />}
    </button>
  );
};

const Play = () => <PlayIcon className="h-8 w-8" />;
const Pause = () => <PauseIcon className="h-8 w-8" />;

export default VideoPause;
