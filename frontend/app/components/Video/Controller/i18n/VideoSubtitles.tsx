"use client";

import { ChangeEvent, useMemo } from "react";

export type VideoSubtitlesFC = React.FunctionComponent<{ subtitle?: number, subtitles: ReadonlySet<{ id: number, name: string }>, handle: (subtitle?: number) => void }>;

const VideoSubtitles: VideoSubtitlesFC = ({ subtitle, subtitles, handle }) => {

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {

        const id = event.currentTarget.value ? Number.parseInt(event.currentTarget.value) : undefined;

        handle(id);
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

export default VideoSubtitles;