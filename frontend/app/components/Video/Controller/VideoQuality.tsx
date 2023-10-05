"use client";

import { TvIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, createContext, useCallback, useMemo } from "react";

export type VideoQualityFC = React.FunctionComponent<{
    quality?: number,
    qualities: ReadonlySet<{
        id: number, name: string
    }>,
    handle: (subtitle?: number) => void
}>;

const VideoQuality: VideoQualityFC = ({ quality, qualities, handle }) => {

    const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {

        const id = event.currentTarget.value ? Number.parseInt(event.currentTarget.value) : undefined;

        handle(id);
    }, [handle]);

    const options = useMemo(() => {
        return Array.from(qualities).map(({ id, name }) => <option key={id} value={id}>{name}</option>)
    }, [qualities]);

    return <div className="flex">
        <button type="button">
            <TvIcon className="h-8 w-8 text-gray-300" />
        </button>
        <select title="quality" id="quality" onChange={onChange}>
            <option>Auto</option>
            {options}
        </select>
    </div>
};

export default VideoQuality;