import { ChangeEvent, FC, useMemo } from "react";
import useVideoLanguage from "~/hooks/video/useVideoLanguage";

const VideoAudio: FC = () => {

    const { audio, audios, changeAudio } = useVideoLanguage.useVideoAudio();

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const value = event.currentTarget.value;

        if (value) {

            changeAudio(Number.parseInt(value));
        }
    };

    const options = useMemo(() => {
        return Array.from(audios).map(({ id, name }) => <option key={audio} value={id}>{name}</option>);
    }, [audios]);

    return <div>
        <select title="audios" id="audios" onChange={onChange}>
            <option>Disabled</option>
            {options}
        </select>
    </div>
};

export default VideoAudio;