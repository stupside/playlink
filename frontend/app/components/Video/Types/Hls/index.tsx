import { createContext, useContext, useEffect, useMemo } from "react";

import Hls, { HlsConfig } from "hls.js";
import { useVideo } from "~/hooks/video/useVideo";

interface IVideoHlsContext {
    hls: Hls
}

const VideoHlsContext = createContext<IVideoHlsContext>({} as IVideoHlsContext);

export const useVideoHls = () => useContext(VideoHlsContext);

const VideoHlsProvider = ({ children, config }: { children: React.ReactNode, config: Partial<HlsConfig> }) => {

    const { video } = useVideo();

    const hls = useMemo(() => {
        return Hls.isSupported() ? new Hls({ enableWebVTT: false, ...config }) : null;
    }, [config]);

    useEffect(() => {

        if (video.current) {

            if (hls) {

                hls.attachMedia(video.current);
            }
        }

    }, [video.current, hls]);

    return <>
        {hls
            ? <VideoHlsContext.Provider value={{ hls }}>{children}</VideoHlsContext.Provider>
            : <div>HLS is not supported</div>
        }
    </>
};

export default VideoHlsProvider;