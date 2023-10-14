import { useState, useRef, useCallback, FC, useEffect } from "react";
import VideoFullscreen from "./Modes/VideoFullscreen";
import VideoPause from "./VideoPause";
import VideoQuality from "./VideoQuality";
import VideoTimeline from "./VideoTimeline";
import VideoVolume from "./VideoVolume";
import VideoLanguage from "./Language";
import { useVideo } from "~/hooks/video/useVideo";
import VideoPip from "./Modes/VideoPip";
import VideoModes from "./Modes";
import VideoControllerContext from "../Types/VideoControllerContext";

const timeout = 5;

const VideoController: FC<{ Actions: JSX.Element }> = ({ Actions }) => {

    const { video } = useVideo();

    const controller = useRef<HTMLDivElement>(null);
    const portal = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);

    const closeTimeout = useRef<NodeJS.Timeout>();

    const closeController = useCallback(() => {

        clearTimeout(closeTimeout.current);

        setVisible(false);

    }, [setVisible, closeTimeout.current]);

    const openController = useCallback(() => {

        clearTimeout(closeTimeout.current);

        setVisible(true);

        closeTimeout.current = setTimeout(() => {

            setVisible(false);
        }, timeout * 1000);

    }, [setVisible, closeTimeout.current, timeout]);

    useEffect(() => {

        const onMouseMove = () => {
            openController();
        };

        video.current?.addEventListener("mousemove", onMouseMove);

        return () => {

            video.current?.removeEventListener("mousemove", onMouseMove);
        }
    }, [video, openController]);

    return <div
        id="controls"
        ref={controller}
        className="absolute flex flex-col items-center justify-between w-full h-full bg-gradient-to-t from-black to-transparent cursor-auto select-none"
        onMouseMove={openController}
        onMouseLeave={closeController}
        style={{
            visibility: visible === false ? "hidden" : "visible"
        }}
    >
        <VideoControllerContext.Provider value={{
            portal,
            controller,
            visible,
            open: openController,
            close: closeController,
        }}>
            <div ref={portal}></div>
            <div className="flex flex-col w-full">

                <div className="mx-4">
                    <VideoTimeline />
                </div>

                <div className="flex flex-row justify-between mx-8 my-3">

                    <div className="flex flex-row flex-grow items-center gap-5">
                        <VideoPause />
                        <VideoVolume />
                    </div>

                    <div className="flex flex-row items-center gap-5">

                        {Actions}

                        <VideoFullscreen />
                        <VideoPip />
                    </div>
                </div>
            </div>
        </VideoControllerContext.Provider>
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