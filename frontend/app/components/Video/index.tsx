
import VideoProvider from "./VideoProvider"

import VideoHls from "./VideoHls"
import VideoMp4 from "./VideoMp4"
import { LinkVideoType } from "~/hooks/sse/useSse";
import Controller from "./Controller";

const players: Record<LinkVideoType, JSX.Element> = {
    "m3u8": <VideoHls />,
    "mp4": <VideoMp4 />
};

const Video = ({ url, type }: { url: string, type: LinkVideoType }) => {

    return <VideoProvider url={url}>
        {players[type]}
    </VideoProvider>;
};

export default Object.assign(Video, {
    Controller: Controller
});