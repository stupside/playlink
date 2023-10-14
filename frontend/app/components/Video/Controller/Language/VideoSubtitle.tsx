import { CheckIcon } from "@heroicons/react/24/solid";
import { FC, MouseEventHandler } from "react";
import useVideoLanguage from "~/hooks/video/useVideoLanguage";

const VideoSubtitle: FC = () => {

    const { subtitle, subtitles, changeSubtitle } = useVideoLanguage.useVideoSubtitle();

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {

        const value = event.currentTarget.value;

        changeSubtitle(Number.parseInt(value));
    };

    return <div>
        <ul id="subtitles" className="mx-1">
            {Array.from(subtitles).map(({ id, name }) =>
                <li key={name} className="flex items-center gap-3 my-1">
                    <button className="p-2 hover:bg-slate-200 rounded-lg" value={id} onClick={onClick}>{name}</button> {subtitle === id && <CheckIcon className="w-4 h-4" />}
                </li>
            )}
        </ul>
    </div>;
};

export default VideoSubtitle;