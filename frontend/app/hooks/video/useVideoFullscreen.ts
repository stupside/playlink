import { useEffect, useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useVideo } from "./useVideo";

const VideoState_Fullscreen = atom<boolean>({
    key: "VideoState_Fullscreen",
    default: false
});

const useVideoFullscreen = () => {

    const { player } = useVideo();

    const [fullscreen, setFullscreen] = useRecoilState(VideoState_Fullscreen);

    useEffect(() => {

        const onFullscreen = () => {
            setFullscreen(document.fullscreenEnabled);
        };

        player.current?.addEventListener("fullscreenchange", onFullscreen);

        return () => {

            player.current?.removeEventListener("fullscreenchange", onFullscreen);
        };

    }, [player.current, setFullscreen, document.fullscreenEnabled]);

    const toggle = useCallback(async () => {

        if (player.current) {

            if (fullscreen && document.fullscreenElement) {

                await document.exitFullscreen();
            }
            else {

                await player.current.requestFullscreen();
            }
        }
    }, [player.current, document.fullscreenElement]);

    return {
        fullscreen,
        toggle
    };
};

export default useVideoFullscreen;