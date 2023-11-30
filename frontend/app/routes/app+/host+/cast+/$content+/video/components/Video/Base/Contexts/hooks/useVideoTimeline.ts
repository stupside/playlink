import { useCallback, useMemo, useLayoutEffect } from "react";

import { atom, useRecoilState } from "recoil";

import { useVideo } from "../../../VideoProvider";

const VideoState_Timeline = atom<number>({
  key: "VideoState_Timeline",
  default: 0,
});

const useVideoTimeline = () => {
  const { video } = useVideo();

  const [timeline, setTimeline] = useRecoilState(VideoState_Timeline);

  useLayoutEffect(() => {
    if (video.current) {
      setTimeline(video.current.currentTime);
    }

    const onTimeUpdate = () => {
      if (video.current) {
        const time = Number(video.current?.currentTime.toFixed());

        setTimeline(time);
      }
    };

    video.current?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [video.current]);

  const seekTimeline = useCallback(
    (position: number) => {
      if (video.current) {
        video.current.currentTime = position;
      }
    },
    [video.current]
  );

  const duration = useMemo(() => {
    return Number(fixNumber(video.current?.duration).toFixed());
  }, [video.current?.duration]);

  return {
    timeline,
    duration,
    seekTimeline,
  };
};

const fixNumber = (value?: number) => {
  if (value) {
    if (isNaN(value)) return 0;

    return value;
  }

  return 0;
};

export default useVideoTimeline;
