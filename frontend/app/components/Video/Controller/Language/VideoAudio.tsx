import { CheckIcon } from "@heroicons/react/24/solid";
import { FC, MouseEventHandler } from "react";
import useVideoLanguage from "~/hooks/video/useVideoLanguage";

const VideoAudio: FC = () => {

    const { audio, audios, changeAudio } = useVideoLanguage.useVideoAudio();

    const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {

        const value = event.currentTarget.value;

        changeAudio(Number.parseInt(value));
    };

    return <div>
        <ul id="audios" className="mx-1">
            {Array.from(audios).map(({ id, name }) =>
                <li key={name} className="flex items-center gap-3 my-1">
                    <button className="p-2 hover:bg-slate-200 rounded-lg" value={id} onClick={onClick}>{name}</button> {id === audio && <CheckIcon className="w-4 h-4" />}
                </li>
            )}
        </ul>
    </div>;
};

export default VideoAudio;