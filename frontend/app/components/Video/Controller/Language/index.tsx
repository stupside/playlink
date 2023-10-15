import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"
import { FC, PropsWithChildren, useState } from "react";
import VideoAudio from "./VideoAudio";
import VideoSubtitle from "./VideoSubtitle";
import VideoPortal from "../VideoPortal";
import norigin from "@noriginmedia/norigin-spatial-navigation";

const VideoLanguage: FC<{ AudioProvider: FC<PropsWithChildren>, SubtitleProvider: FC<PropsWithChildren> }> = ({ AudioProvider, SubtitleProvider }) => {

    const [open, setOpen] = useState(false);

    const { ref } = norigin.useFocusable();

    return <div className="flex">
        <button type="button" ref={ref} className="flex items-center text-gray-300" onClick={() => {
            setOpen((opened) => !opened);
        }}>
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
            <span>Audio & Subtitles</span>
        </button>
        {open &&
            <VideoPortal>
                <div className="flex flex-col">
                    <div className="mb-3 font-bold text-lg">Audio</div>
                    <AudioProvider>
                        <VideoAudio />
                    </AudioProvider>
                </div>
                <div className="flex flex-col">
                    <div className="mb-3 font-bold text-lg">Subtitle</div>
                    <SubtitleProvider>
                        <VideoSubtitle />
                    </SubtitleProvider>
                </div>
            </VideoPortal>
        }
    </div>
};

export default Object.assign(VideoLanguage, {
    Audio: VideoAudio,
    Subtitle: VideoAudio
});