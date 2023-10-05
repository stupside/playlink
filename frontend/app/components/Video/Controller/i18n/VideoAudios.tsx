import { ChangeEvent, useMemo } from "react";

export type VideoAudiosFC = React.FunctionComponent<{ audio: number, audios: ReadonlySet<{ id: number, name: string }>, handle: (audio: number) => void }>;

const VideoAudios: VideoAudiosFC = ({ audio, audios, handle }) => {

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const value = event.currentTarget.value;

        if (value) {

            handle(Number.parseInt(value));
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

export default VideoAudios;