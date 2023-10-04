import { GlobeAmericasIcon } from "@heroicons/react/24/solid"

const VideoI18N = ({ audios, subtitles }: { audios: React.ReactNode, subtitles: React.ReactNode }) => {

    return <div className="flex">
        <button type="button">
            <GlobeAmericasIcon className="h-8 w-8 text-gray-300" />
        </button>
        <div>
            {audios}
            {subtitles}
        </div>
    </div>
};

export default VideoI18N;