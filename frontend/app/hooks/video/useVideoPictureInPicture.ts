import { useCallback } from "react";
import { useVideo } from "~/components/Video/VideoProvider";

const useVideoPictureInPicture = () => {

    const { video } = useVideo();

    const toggle = useCallback(() => {

        if (video.current) {

            video.current.requestPictureInPicture();
        }

    }, [video.current]);

    return toggle;
};

export default useVideoPictureInPicture;