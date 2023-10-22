import { PlayIcon } from "@heroicons/react/24/solid"
import norigin from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";

const SseLink = ({ session, url, link }: { session: number, url: string, link: number }) => {

    const navigate = useNavigate();

    const { ref } = norigin.useFocusable();

    const play = useCallback(() => {
        navigate(`/sessions/${session}/links/${link}`);
    }, [navigate, link, session]);

    return <div className="flex gap-3">
        <span className="text-white font-bold whitespace-nowrap">{url.substring(0, 50)}</span>
        <button type="button" ref={ref} title="play" className="block" onClick={play}>
            <span><PlayIcon className="w-6 h-6 text-white" /></span>
        </button>
    </div>;
};

export default SseLink;