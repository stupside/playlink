import { useCallback } from "react";
import { useVideo } from "../VideoProvider"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const VideoPictureInPicture = () => {

    const { video } = useVideo();

    const togglePip = useCallback(() => {

        if (video.current) {

            video.current.requestPictureInPicture();
        }

    }, [video.current]);

    return <button id="pip" type="button" onClick={togglePip}>
        <ArrowTopRightOnSquareIcon className="h-8 w-8 text-gray-300" />
    </button>;
};

export default VideoPictureInPicture;