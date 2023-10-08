import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import VideoAudioContext from "../../VideoAudioContext";
import Hls from "hls.js";
import { useVideoHls } from "..";

const VideoHlsAudioProvider: FC<PropsWithChildren> = ({ children }) => {

    const { hls } = useVideoHls();

    const [audio, setAudio] = useState<number>(0);
    const [audios, setAudios] = useState<ReadonlySet<{ id: number, name: string }>>(new Set());

    useEffect(() => {

        hls.once(Hls.Events.MANIFEST_PARSED, (_, data) => {

            const map = data.audioTracks?.map(audio => ({ id: audio.id, name: audio.name }));

            setAudios(new Set(map));
        });

        hls.on(Hls.Events.AUDIO_TRACK_LOADED, (_, data) => {

            console.log(Hls.Events.AUDIO_TRACK_LOADED);

            setAudio(data.id);
        });

    }, [hls.on, setAudio, setAudios]);

    const changeAudio = useCallback((audio: number) => {

        const index = Array.from(audios).findIndex(({ id }) => id === audio);

        hls.audioTrack = index;
    }, [hls, audios]);

    return <VideoAudioContext.Provider value={{
        audio,
        audios,
        changeAudio,
    }}>
        {children}
    </VideoAudioContext.Provider>
};

export default VideoHlsAudioProvider;