import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import { useVideo } from "../VideoProvider"
import { useCallback, useEffect, useState } from "react";

const VideoFullscreen = () => {

    const { player } = useVideo();

    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {

        const onFullscreen = () => {
            setFullscreen(document.fullscreenEnabled);
        }

        player.current?.addEventListener("fullscreenchange", onFullscreen);

        return () => {

            player.current?.removeEventListener("fullscreenchange", onFullscreen);
        }

    }, [player.current, setFullscreen, document.fullscreenEnabled]);

    const toggleFullscreen = useCallback(async () => {

        if (player.current) {

            if (fullscreen && document.fullscreenElement) {

                await document.exitFullscreen();
            }
            else {

                await player.current.requestFullscreen();
            }
        }
    }, [player.current, document.fullscreenElement]);

    return <button id="fullscreen" type="button" onClick={toggleFullscreen}>
        {fullscreen
            ? <ArrowsPointingInIcon className="h-8 w-8 text-gray-300" />
            : <ArrowsPointingOutIcon className="h-8 w-8 text-gray-300" />}
    </button>;
};

export default VideoFullscreen;