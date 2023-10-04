import { useEffect } from "react";
import { useVideoHls } from ".";

export const VideoHlsLoader = ({ source }: { source: string }) => {

    const { hls } = useVideoHls();

    useEffect(() => {

        hls.loadSource(source);

    }, [hls, source])

    return <></>;
}