import VideoQuality from "./Controller/VideoQuality";
import VideoHlsProvider from "./Types/Hls";
import { VideoHlsLoader } from "./Types/Hls/VideoHlsLoader";
import Video from ".";
import VideoHlsQualityProvider from "./Types/Hls/VideoHlsQualityProvider";
import VideoHlsSubtitleProvider from "./Types/Hls/Language/VideoHlsSubtitleProvider";
import VideoHlsAudioProvider from "./Types/Hls/Language/VideoHlsAudioProvider";

const VideoHls = () => {

    return <VideoHlsProvider config={{}} >

        <div className="absolute top-1/2 left-1/2">
            <VideoHlsLoader />
        </div>

        <Video.Controller Actions={
            <>
                <VideoHlsQualityProvider>
                    <VideoQuality />
                </VideoHlsQualityProvider>

                <Video.Controller.Language
                    SubtitleProvider={VideoHlsSubtitleProvider}
                    AudioProvider={VideoHlsAudioProvider}
                />
            </>
        } />

    </VideoHlsProvider>;
};

export default VideoHls;