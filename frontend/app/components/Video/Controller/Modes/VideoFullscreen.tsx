import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

import useVideoFullscreen from "~/hooks/video/useVideoFullscreen";

const VideoFullscreen = () => {

    const { toggle, fullscreen } = useVideoFullscreen();

    return <button id="fullscreen" type="button" onClick={toggle}>
        {fullscreen
            ? <Off />
            : <On />
        }
    </button>;
};

const Off = () => <ArrowsPointingInIcon className="h-8 w-8 text-gray-300" />;
const On = () => <ArrowsPointingOutIcon className="h-8 w-8 text-gray-300" />;

export default VideoFullscreen;