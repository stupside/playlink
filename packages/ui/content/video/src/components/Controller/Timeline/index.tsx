import { type FC } from "react";

import { Time } from "@playlink/ui-typography";

import { useVideo } from "src/hooks";

import Line from "./Line";
import Play from "./Play";

const Timeline: FC<{
  features: Partial<{
    play: boolean;
    seek: boolean;
  }>;
}> = ({ features }) => {
  const { useVideoTimeline } = useVideo();

  const { timeline, duration, seekTimeline } = useVideoTimeline();

  return (
    <>
      {features?.play && <Play />}

      <div>
        <Time time={timeline} />
      </div>

      <Line
        current={timeline}
        duration={duration}
        seek={(percent) => {
          if (features?.seek) seekTimeline(percent);
        }}
      />

      <div>
        <Time time={duration} />
      </div>
    </>
  );
};

export default Timeline;
