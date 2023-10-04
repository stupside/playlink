"use client";

import { useCallback, useEffect, useState } from "react";
import { useVideoHls } from "..";
import Hls from "hls.js";
import { VideoAudiosFC } from "~/components/Video/Controller/i18n/VideoAudios";

export const VideoHlsAudiosWrapper = ({ Controller }: { Controller: VideoAudiosFC }) => {

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

    const handle = useCallback((audio: number) => {

        const index = Array.from(audios).findIndex(({ id }) => id === audio);

        hls.audioTrack = index;
    }, [hls, audios]);

    return <Controller audio={audio} audios={audios} handle={handle} />;
}