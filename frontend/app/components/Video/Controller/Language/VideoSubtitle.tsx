import { ChangeEvent, FC, useMemo } from "react";
import useVideoLanguage from "~/hooks/video/useVideoLanguage";

const VideoSubtitle: FC = () => {

    const { subtitle, subtitles, changeSubtitle } = useVideoLanguage.useVideoSubtitle();

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const id = event.currentTarget.value ? Number.parseInt(event.currentTarget.value) : undefined;

        changeSubtitle(id);
    };

    const options = useMemo(() => {
        return Array.from(subtitles).map(({ id, name }) => <option key={subtitle} value={id}>{name}</option>);
    }, [subtitles])

    return <div>
        <select title="subtitles" id="subtitles" onChange={onChange}>
            <option>Disabled</option>
            {options}
        </select>
    </div>
};

export default VideoSubtitle;