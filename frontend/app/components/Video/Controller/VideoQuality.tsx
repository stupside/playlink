import { CheckIcon, TvIcon } from "@heroicons/react/24/solid";
import { FC, useState, MouseEventHandler } from "react";
import { useVideoQuality } from "~/hooks/video/useVideoQuality";
import VideoPortal from "./VideoPortal";
import norigin from "@noriginmedia/norigin-spatial-navigation";

const VideoQuality: FC = () => {

    const [open, setOpen] = useState(false);

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    return <div>
        <button type="button" ref={ref} className="flex items-center text-gray-300" onClick={() => {
            setOpen((opened) => !opened);
        }}>
            <TvIcon className="h-6 w-6" />
            <span>Quality</span>
        </button>
        {open && <VideoPortal>
            <div className="flex flex-col">
                <div className="mb-3 font-bold text-lg">Audio</div>
                <Qualities />
            </div>
        </VideoPortal>}
    </div>
};

const Qualities = () => {

    const { qualities } = useVideoQuality();

    const { ref, focusKey } = norigin.useFocusable({
        trackChildren: true
    });

    return <norigin.FocusContext.Provider value={focusKey}>
        <ul ref={ref} id="qualities" className="mx-1">
            {Array.from(qualities).map(({ id, name }) =>
                <Quality key={id} id={id} name={name} />
            )}
        </ul>
    </norigin.FocusContext.Provider>
};

const Quality = ({ id, name }: { id: number, name: string }) => {

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    const { quality, changeQuality } = useVideoQuality();

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {

        const value = event.currentTarget.value;

        changeQuality(Number.parseInt(value));
    };

    return <li className="flex items-center gap-3 my-1">
        <button ref={ref} className="p-2 hover:bg-slate-200 rounded-lg" value={id} onClick={onClick}>{name}</button> {id === quality && <CheckIcon className="w-4 h-4" />}
    </li>
};

export default VideoQuality;