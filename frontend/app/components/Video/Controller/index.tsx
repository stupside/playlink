import { useState, useRef, useCallback, FC, PropsWithChildren, useEffect } from "react";
import VideoFullscreen from "./Modes/VideoFullscreen";
import VideoPause from "./VideoPause";
import VideoQuality from "./VideoQuality";
import VideoTimeline from "./VideoTimeline";
import VideoVolume from "./VideoVolume";
import VideoLanguage from "./Language";
import { useVideo } from "~/hooks/video/useVideo";
import VideoPip from "./Modes/VideoPip";
import VideoModes from "./Modes";

const timeout = 5;

const VideoController: FC<{ Actions: JSX.Element }> = ({ Actions }) => {

    const [showControls, setShowControls] = useState(false);

    const { video } = useVideo();

    const controlsTimeout = useRef<NodeJS.Timeout>();

    const onLeaveControls = useCallback(() => {

        clearTimeout(controlsTimeout.current);

        setShowControls(false);

    }, [setShowControls, controlsTimeout.current]);

    const delayCloseControls = useCallback(() => {

        clearTimeout(controlsTimeout.current);

        controlsTimeout.current?.refresh();

        setShowControls(true);

        controlsTimeout.current = setTimeout(() => {

            setShowControls(false);
        }, timeout * 1000);

    }, [setShowControls, controlsTimeout.current, timeout]);

    useEffect(() => {

        const onMouseMove = () => {
            delayCloseControls();
        };

        video.current?.addEventListener("mousemove", onMouseMove);

        return () => {

            video.current?.removeEventListener("mousemove", onMouseMove);
        }
    }, [video, delayCloseControls]);

    return <div
        id="controls"
        hidden={showControls === false}
        className="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent cursor-auto select-none"
        onMouseMove={delayCloseControls}
        onMouseLeave={onLeaveControls}
    >
        <div className="absolute bottom-0 flex flex-col w-full">

            <div className="mx-4">
                <VideoTimeline />
            </div>

            <div className="flex flex-row justify-between mx-16 my-3">

                <div className="flex flex-row flex-grow gap-5">
                    <VideoPause />
                    <VideoVolume />
                </div>

                <div className="flex flex-row gap-5">

                    {Actions}

                    <VideoFullscreen />
                    <VideoPip />
                </div>
            </div>
        </div>
    </div>
};

export default Object.assign(VideoController, {
    Mode: VideoModes,
    Pause: VideoPause,
    Volume: VideoVolume,
    Quality: VideoQuality,
    Timeline: VideoTimeline,
    Language: VideoLanguage
});