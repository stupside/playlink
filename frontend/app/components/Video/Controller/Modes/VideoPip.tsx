import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import norigin from "@noriginmedia/norigin-spatial-navigation";
import useVideoPip from "~/hooks/video/useVideoPip";

const VideoPip = () => {

    const toggle = useVideoPip();

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    return <button id="pip" type="button" ref={ref} onClick={toggle}>
        <ArrowTopRightOnSquareIcon className="h-8 w-8 text-gray-300" />
    </button>;
};

export default VideoPip;