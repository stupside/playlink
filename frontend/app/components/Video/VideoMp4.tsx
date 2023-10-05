import VideoFullscreen from "./Controller/VideoFullscreen";
import VideoPause from "./Controller/VideoPause";
import VideoPictureInPicture from "./Controller/VideoPictureInPicture";
import VideoTimeline from "./Controller/VideoTimeline";
import VideoVolume from "./Controller/VideoVolume";

const VideoMp4 = () => {

    return <div className="absolute bottom-0 flex flex-col w-full ">

        <div className="mx-4">
            <VideoTimeline />
        </div>

        <div className="flex flex-row justify-between mx-16 my-3">

            <div className="flex flex-row flex-grow gap-5">
                <VideoPause />
                <VideoVolume />
            </div>

            <div className="flex flex-row gap-5">
                <VideoPictureInPicture />
                <VideoFullscreen />
            </div>
        </div>
    </div>;
};

export default VideoMp4;