import { atom, useRecoilState } from "recoil";
import { useVideo } from "../VideoProvider";
import { useCallback, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/24/solid";

const VideoState_Paused = atom<boolean>({
    key: "VideoState_Paused",
    default: true
});

const VideoPause = () => {

    const { video } = useVideo();

    const [paused, setPaused] = useRecoilState(VideoState_Paused);

    useEffect(() => {

        const { current } = video;

        if (current) {
            setPaused(current.paused);
        }

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
        }

    }, [video.current, setPaused]);

    const togglePaused = useCallback(() => {

        if (video.current?.paused) {

            video?.current?.play();
        }
        else {

            video?.current?.pause();
        }
    }, [video.current]);

    return <button type="button" id="play" onClick={togglePaused}>
        {
            paused
                ? <PlayIcon className="h-8 w-8 text-gray-300" />
                : <PauseIcon className="h-8 w-8 text-gray-300" />
        }
    </button>
};

export default VideoPause;