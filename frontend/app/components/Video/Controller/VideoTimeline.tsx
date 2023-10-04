"use client";

import { atom, useRecoilState } from "recoil";
import { useVideo } from "../VideoProvider";
import { useCallback, useEffect, useMemo, useState } from "react";

export const VideoState_Timeline = atom<number>({
    key: "VideoState_Timeline",
    default: 0
});

const colors = {
    notwatched: "bg-slate-100",
    watched: "bg-red-600"
};

export type VideoTimelineFC = React.FunctionComponent<{}>;

const VideoTimeline: VideoTimelineFC = () => {

    const { video } = useVideo();

    const [timeline, setTimeline] = useRecoilState(VideoState_Timeline);

    const [nextTimeline, setNextTimeline] = useState(0);

    const [timelineFocused, setTimelineFocused] = useState(false);
    const [timelineHolden, setTimelineHolden] = useState(false);

    useEffect(() => {

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
        }

    }, [video.current, setTimeline]);

    const duration = useMemo(() => {

        return Number(fixNumber(video.current?.duration).toFixed());
    }, [video.current?.duration]);

    const getPercent = useCallback((timeline: number) => {

        if (duration)
            return Number(100 * timeline / duration).toFixed();

        return 0;

    }, [duration]);

    const holdTimeline = useCallback(() => {

        setTimelineHolden(true);
    }, [setTimelineHolden]);

    const releaseTimeline = useCallback(() => {

        if (video.current) {

            video.current.currentTime = nextTimeline;
        }

        setTimelineHolden(false);

    }, [setTimelineHolden, video.current, nextTimeline]);

    const onTimelineEvent = useCallback(({ clientX, currentTarget }: { clientX: number, currentTarget: HTMLDivElement }) => {

        const percent = getCursorPositionInDiv(clientX, currentTarget);

        if (video.current) {

            const factor = Math.min(Math.max(percent, 0), 1);

            setNextTimeline(factor * video.current.duration);
        }
    }, [setNextTimeline, video.current]);

    return <div className="flex items-center">

        <div className="mx-5">
            <TimeIndicator timeline={timeline} />
        </div>

        <div className="relative w-full flex items-center cursor-pointer"

            onMouseEnter={() => { setTimelineFocused(true); }}
            onMouseLeave={() => { setTimelineFocused(false); }}

            onMouseDown={holdTimeline}
            onMouseUp={releaseTimeline}

            onClick={onTimelineEvent}
            onMouseMove={(props) => {

                if (timelineHolden) {
                    onTimelineEvent(props);
                }
            }}
        >
            <div className={`absolute w-full h-2 ${colors.notwatched} opacity-30 rounded-full`}></div>

            <div className="absolute w-full flex items-center rounded-full">

                <div
                    className={`h-2 ${colors.watched} rounded-full`}

                    style={{ width: `${timelineHolden ? getPercent(nextTimeline) : getPercent(timeline)}%` }}
                >
                </div>

                <button hidden={timelineFocused === false && timelineHolden === false} className={`w-4 h-4 rounded-full ${colors.watched} -ml-2`}></button>
            </div>
        </div>

        <div className="mx-5">
            <TimeIndicator timeline={duration} />
        </div>

    </div>;
}

const TimeIndicator = ({ timeline }: { timeline: number }) => {

    const minutes = Number((timeline / 60).toFixed());
    const seconds = timeline % 60;

    const getDigits = (value: number) => value < 10 ? `0${value}` : value;

    return <span className="text-gray-300">{getDigits(minutes)}:{getDigits(seconds)}</span>
};

const fixNumber = (value?: number) => {

    if (value) {

        if (isNaN(value)) return 0;

        return value;
    }

    return 0;
};

const getCursorPositionInDiv = (clientX: number, target: HTMLDivElement) => {

    const bounds = target.getBoundingClientRect();

    const relativeX = clientX - bounds.left;

    const percent = relativeX / target.clientWidth;

    return percent;
};

export default VideoTimeline;