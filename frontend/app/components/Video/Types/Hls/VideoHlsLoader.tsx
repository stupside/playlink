import { useEffect } from "react";
import { useVideoHls } from ".";
import { useVideo } from "~/hooks/video/useVideo";

export const VideoHlsLoader = () => {

    const { hls } = useVideoHls();

    const { url } = useVideo();

    useEffect(() => {

        hls.loadSource(url);

    }, [hls, url])

    return <></>;
}