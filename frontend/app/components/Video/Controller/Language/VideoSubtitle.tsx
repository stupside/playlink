import { CheckIcon } from "@heroicons/react/24/solid";
import { FC, MouseEventHandler } from "react";
import norigin from "@noriginmedia/norigin-spatial-navigation";
import useVideoLanguage from "~/hooks/video/useVideoLanguage";

const VideoSubtitle: FC = () => {

    const { ref, focusKey } = norigin.useFocusable({
        trackChildren: true
    });

    const { subtitles } = useVideoLanguage.useVideoSubtitle();

    return <div>
        <norigin.FocusContext.Provider value={focusKey}>
            <ul ref={ref} id="subtitles" className="mx-1">
                {Array.from(subtitles).map(({ id, name }) =>
                    <Subtitle key={id} id={id} name={name} />
                )}
            </ul>
        </norigin.FocusContext.Provider>
    </div>;
};

const Subtitle = ({ id, name }: { id: number, name: string }) => {

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    const { subtitle, changeSubtitle } = useVideoLanguage.useVideoSubtitle();

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {

        const value = event.currentTarget.value;

        changeSubtitle(Number.parseInt(value));
    };

    return <li className="flex items-center gap-3 my-1">
        <button ref={ref} className="p-2 hover:bg-slate-200 rounded-lg" value={id} onClick={onClick}>
            {name}
        </button>
        {subtitle === id && <CheckIcon className="w-4 h-4" />}
    </li>
}

export default VideoSubtitle;