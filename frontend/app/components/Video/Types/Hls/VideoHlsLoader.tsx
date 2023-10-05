import { useEffect } from "react";
import { useVideoHls } from ".";
import { useVideo } from "../../VideoProvider";

export const VideoHlsLoader = () => {

    const { hls } = useVideoHls();

    const { url } = useVideo();

    useEffect(() => {

        hls.loadSource(url);

    }, [hls, url])

    return <></>;
}