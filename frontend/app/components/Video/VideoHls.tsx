import VideoFullscreen from "./Controller/VideoFullscreen";
import VideoPause from "./Controller/VideoPause";
import VideoPictureInPicture from "./Controller/VideoPictureInPicture";
import VideoQuality from "./Controller/VideoQuality";
import VideoTimeline from "./Controller/VideoTimeline";
import VideoVolume from "./Controller/VideoVolume";
import VideoI18N from "./Controller/i18n";
import VideoAudios from "./Controller/i18n/VideoAudios";
import VideoSubtitles from "./Controller/i18n/VideoSubtitles";
import VideoHlsProvider from "./Types/Hls";
import { VideoHlsLoader } from "./Types/Hls/VideoHlsLoader";
import { VideoHlsQualityWrapper } from "./Types/Hls/VideoHlsQualityWrapper";
import { VideoHlsAudiosWrapper } from "./Types/Hls/i18n/VideoHlsAudiosWrapper";
import { VideoHlsSubtitlesWrapper } from "./Types/Hls/i18n/VideoHlsSubtitlesWrapper";

const VideoHls = () => {

    return <VideoHlsProvider config={{}} >

        <div className="absolute top-1/2 left-1/2">
            <VideoHlsLoader />
        </div>

        <div className="absolute bottom-0 flex flex-col w-full ">

            <div className="mx-4">
                <VideoTimeline />
            </div>

            <div className="flex flex-row justify-between mx-16 my-3">

                <div className="flex flex-row flex-grow gap-5">
                    <VideoPause />
                    <VideoVolume />
                </div>

                <div className="flex flex-row gap-5">

                    <VideoHlsQualityWrapper Controller={VideoQuality} />

                    <VideoI18N
                        subtitles={<VideoHlsSubtitlesWrapper Controller={VideoSubtitles} />}
                        audios={<VideoHlsAudiosWrapper Controller={VideoAudios} />}
                    />

                    <VideoPictureInPicture />
                    <VideoFullscreen />
                </div>
            </div>


        </div>

    </VideoHlsProvider>;
};

export default VideoHls;