import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import norigin from "@noriginmedia/norigin-spatial-navigation";

import useVideoFullscreen from "~/hooks/video/useVideoFullscreen";

const VideoFullscreen = () => {

    const { toggle, fullscreen } = useVideoFullscreen();

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    return <button id="fullscreen" ref={ref} type="button" onClick={toggle}>
        {fullscreen
            ? <Off />
            : <On />
        }
    </button>;
};

const Off = () => <ArrowsPointingInIcon className="h-8 w-8 text-gray-300" />;
const On = () => <ArrowsPointingOutIcon className="h-8 w-8 text-gray-300" />;

export default VideoFullscreen;