import { TvIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FC, createContext, useCallback, useMemo } from "react";
import { useVideoQuality } from "~/hooks/video/useVideoQuality";

const VideoQuality: FC = () => {

    const { qualities, changeQuality } = useVideoQuality();

    const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {

        const id = event.currentTarget.value ? Number.parseInt(event.currentTarget.value) : undefined;

        changeQuality(id);

    }, [changeQuality]);

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