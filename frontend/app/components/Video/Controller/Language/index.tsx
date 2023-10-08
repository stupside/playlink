import { GlobeAmericasIcon } from "@heroicons/react/24/solid"
import { FC, PropsWithChildren } from "react";
import VideoAudio from "./VideoAudio";
import VideoSubtitle from "./VideoSubtitle";

const VideoLanguage: FC<{ AudioProvider: FC<PropsWithChildren>, SubtitleProvider: FC<PropsWithChildren> }> = ({ AudioProvider, SubtitleProvider }) => {

    return <div className="flex">
        <button type="button">
            <GlobeAmericasIcon className="h-8 w-8 text-gray-300" />
        </button>
        <div>
            <AudioProvider>
                <VideoAudio />
            </AudioProvider>
            <SubtitleProvider>
                <VideoSubtitle />
            </SubtitleProvider>
        </div>
    </div>
};

export default Object.assign(VideoLanguage, {
    Audio: VideoAudio,
    Subtitle: VideoAudio
});