import { useEffect, useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useVideo } from "~/components/Video/VideoProvider";

const VideoState_Muted = atom<boolean>({
    key: "VideoState_Muted",
    default: false
});

const VideoState_Volume = atom<number>({
    key: "VideoState_Volume",
    default: 0
});

const useVideoVolume = () => {

    const { video } = useVideo();

    const [muted, setMuted] = useRecoilState(VideoState_Muted);
    const [volume, setVolume] = useRecoilState(VideoState_Volume);

    useEffect(() => {

        if (video.current) {

            setVolume(video.current.volume);
            setMuted(video.current.muted);
        }

        const onVolumeChange = () => {

            if (video?.current) {

                setVolume(video.current.volume);
                setMuted(video.current.muted);
            }
        };

        video.current?.addEventListener("volumechange", onVolumeChange);

        return () => {
            video.current?.removeEventListener("volumechange", onVolumeChange);
        }

    }, [video.current, setVolume, setMuted]);

    const seekVolume = useCallback((percent: number) => {
        if (video.current) {
            video.current.volume = Math.min(Math.max(percent, 0), 1);
        }
    }, [video.current]);

    const toggleMute = useCallback(() => {

        if (video.current) {

            video.current.muted = !muted;
        }
    }, [video.current, muted]);

    return {
        muted,
        volume,
        seekVolume,
        toggleMute,
    }
};

export default useVideoVolume;