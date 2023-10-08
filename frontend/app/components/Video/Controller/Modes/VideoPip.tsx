import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import useVideoPip from "~/hooks/video/useVideoPip";

const VideoPip = () => {

    const toggle = useVideoPip();

    return <button id="pip" type="button" onClick={toggle}>
        <ArrowTopRightOnSquareIcon className="h-8 w-8 text-gray-300" />
    </button>;
};

export default VideoPip;