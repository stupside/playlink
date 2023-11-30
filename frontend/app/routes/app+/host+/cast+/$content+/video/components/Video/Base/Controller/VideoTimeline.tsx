import { FC, useCallback, useState } from "react";

import useVideoTimeline from "../Contexts/hooks/useVideoTimeline";

const VideoTimeline: FC = () => {
  const { duration, seekTimeline, timeline } = useVideoTimeline();

  const [nextTimeline, setNextTimeline] = useState(0);

  const [timelineFocused, setTimelineFocused] = useState(false);
  const [timelineHolden, setTimelineHolden] = useState(false);

  const onHoldTimeline = useCallback(() => {
    setTimelineHolden(true);
  }, [setTimelineHolden]);

  const percent = useCallback(
    (timeline: number) => {
      if (duration) return Number((100 * timeline) / duration).toFixed();

      return 0;
    },
    [duration]
  );

  const onReleaseTimeline = useCallback(() => {
    seekTimeline(nextTimeline);

    setTimelineHolden(false);
  }, [setTimelineHolden, seekTimeline, nextTimeline]);

  const onTimelineEvent = useCallback(
    ({
      clientX,
      currentTarget,
    }: {
      clientX: number;
      currentTarget: HTMLDivElement;
    }) => {
      const percent = getCursorPositionInDiv(clientX, currentTarget);

      const factor = Math.min(Math.max(percent, 0), 1);

      setNextTimeline(factor * duration);
    },
    [setNextTimeline, duration]
  );

  return (
    <div className="flex items-center gap-x-8">
      <div>
        <TimeIndicator time={timeline} />
      </div>

      <div
        className="relative w-full flex items-center cursor-pointer pt-[2px]"
        onMouseEnter={() => {
          setTimelineFocused(true);
        }}
        onMouseLeave={() => {
          setTimelineFocused(false);
        }}
        onMouseDown={onHoldTimeline}
        onMouseUp={onReleaseTimeline}
        onClick={onTimelineEvent}
        onMouseMove={(props) => {
          if (timelineHolden) {
            onTimelineEvent(props);
          }
        }}
      >
        <div className={`absolute w-full h-3 bg-zinc-600 rounded-full`}></div>

        <div className="absolute w-full flex items-center rounded-full">
          <div
            className={`h-3 bg-white rounded-full`}
            style={{
              width: `${
                timelineHolden ? percent(nextTimeline) : percent(timeline)
              }%`,
            }}
          ></div>

          <button
            title="timeline"
            hidden={timelineFocused === false && timelineHolden === false}
            className={`w-4 h-4 rounded-full bg-white -ml-2`}
          ></button>
        </div>
      </div>

      <div>
        <TimeIndicator time={duration} />
      </div>
    </div>
  );
};

const TimeIndicator: FC<{ time: number }> = ({ time }) => {
  const minutes = Number((time / 60).toFixed());
  const seconds = time % 60;

  const getDigits = (value: number) => (value < 10 ? `0${value}` : value);

  return (
    <span className="font-bold">
      {getDigits(minutes)}:{getDigits(seconds)}
    </span>
  );
};

const getCursorPositionInDiv = (clientX: number, target: HTMLDivElement) => {
  const bounds = target.getBoundingClientRect();

  const relativeX = clientX - bounds.left;

  const percent = relativeX / target.clientWidth;

  return percent;
};

export default VideoTimeline;
