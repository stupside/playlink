import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useVideoHls } from ".";
import Hls from "hls.js";
import VideoQualityContext from "../VideoQualityContext";

const VideoHlsQualityProvider: FC<PropsWithChildren> = ({ children }) => {

    const { hls } = useVideoHls();

    const [quality, setQuality] = useState<number>(0);
    const [qualities, setQualities] = useState<ReadonlySet<{ id: number, name: string }>>(new Set());

    useEffect(() => {

        hls.once(Hls.Events.MANIFEST_PARSED, (_, data) => {

            const map = data.levels.map((level, index) => ({ id: index, name: level.name ?? `undefined${index}` }));

            setQualities(new Set(map));
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {

            console.log(Hls.Events.LEVEL_LOADED);

            setQuality(data.level);
        });

    }, [hls.on, setQualities, setQuality]);

    const changeQuality = useCallback((quality?: number) => {

        if (quality) {

            const index = Array.from(qualities).findIndex(({ id }) => id === quality);

            hls.currentLevel = index;
        }
        else {

            hls.currentLevel = -1;
        }
    }, [hls, qualities]);

    return <VideoQualityContext.Provider value={{
        quality,
        qualities,
        changeQuality
    }}>
        {children}
    </VideoQualityContext.Provider>
};

export default VideoHlsQualityProvider;