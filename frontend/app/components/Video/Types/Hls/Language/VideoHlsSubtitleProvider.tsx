"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useVideoHls } from "..";
import Hls from "hls.js";
import VideoSubtitleContext from "../../VideoSubtitleContext";

const VideoHlsSubtitleProvider: FC<PropsWithChildren> = ({ children }) => {

    const { hls } = useVideoHls();

    const [subtitle, setSubtitle] = useState<number>(0);
    const [subtitles, setSubtitles] = useState<ReadonlySet<{ id: number, name: string }>>(new Set());

    useEffect(() => {

        hls.once(Hls.Events.MANIFEST_PARSED, (_, data) => {

            const map = data.subtitleTracks?.map(subtitle => ({ id: subtitle.id, name: subtitle.name }));

            setSubtitles(new Set(map));
        });

        hls.on(Hls.Events.SUBTITLE_TRACK_LOADED, (_, data) => {

            console.log(Hls.Events.SUBTITLE_TRACK_SWITCH);

            setSubtitle(data.id);
        });

    }, [hls.on, setSubtitle, setSubtitles]);

    const changeSubtitle = useCallback((subtitle?: number) => {
        if (subtitle) {

            const index = Array.from(subtitles).findIndex(({ id }) => id === subtitle);

            hls.subtitleDisplay = true;
            hls.subtitleTrack = index;
        }
        else {
            hls.subtitleDisplay = false;
        }
    }, [hls, subtitles]);

    return <VideoSubtitleContext.Provider value={{
        subtitle,
        subtitles,
        changeSubtitle
    }}>
        {children}
    </VideoSubtitleContext.Provider>
};

export default VideoHlsSubtitleProvider;