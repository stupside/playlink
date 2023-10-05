import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

import useVideoPictureInPicture from "~/hooks/video/useVideoPictureInPicture";

const VideoPictureInPicture = () => {

    const toggle = useVideoPictureInPicture();

    return <button id="pip" type="button" onClick={toggle}>
        <ArrowTopRightOnSquareIcon className="h-8 w-8 text-gray-300" />
    </button>;
};

export default VideoPictureInPicture;