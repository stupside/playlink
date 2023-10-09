import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useVideoVolume from "~/hooks/video/useVideoVolume";

const colors = {
    default: "bg-slate-100",
    current: "bg-red-600"
};

const VideoVolume = () => {

    const { muted, volume, toggleMute, seekVolume } = useVideoVolume();

    const [holding, setHolding] = useState(false);

    return <div className="flex items-center w-1/3">

        <button id="mute" type="button" onClick={toggleMute}>
            {muted
                ? <SpeakerXMarkIcon className="h-8 w-8 text-gray-300" />
                : <SpeakerWaveIcon className="h-8 w-8 text-gray-300" />
            }
        </button>

        <div className="relative w-full flex items-center ml-5 cursor-pointer">

            <div className="absolute w-full flex items-center rounded-full"
                onMouseDown={() => { setHolding(true); }}
                onMouseUp={() => { setHolding(false); }}
                onMouseMove={({ clientX, currentTarget }) => {

                    if (holding) {

                        const percent = getCursorPositionInDiv(clientX, currentTarget);

                        seekVolume(percent);
                    }
                }}

                onClick={({ clientX, currentTarget }) => {

                    const percent = getCursorPositionInDiv(clientX, currentTarget);

                    seekVolume(percent);
                }}>

                <div className={`absolute w-full h-2 ${colors.default} opacity-30 rounded-full`}></div>

                <div className="absolute w-full flex items-center rounded-full">

                    <div
                        className={`h-2 ${colors.current} rounded-full`}
                        style={{ width: `${volume * 100}%` }}
                    >
                    </div>

                    <button className={`w-4 h-4 rounded-full ${colors.current} -ml-2`}></button>
                </div>
            </div>
        </div>
    </div>;
};

const getCursorPositionInDiv = (clientX: number, target: HTMLDivElement) => {

    const bounds = target.getBoundingClientRect();

    const relativeX = clientX - bounds.left;

    const percent = relativeX / target.clientWidth;

    return percent;
};

export default VideoVolume;