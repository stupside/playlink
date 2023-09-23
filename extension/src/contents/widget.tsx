import styleText from "data-text:~/style.css"

import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";

import { useEffect, useMemo, useState } from "react";

import PlayIcon from "@heroicons/react/24/solid/PlayIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";

export const getStyle: PlasmoGetStyle = () => {

    const style = document.createElement("style");

    style.textContent = styleText;

    return style;
}

export const config: PlasmoCSConfig = {
}

interface M3U8 {
    initiator?: string,
    url: string,
    timestamp: string
};

const Widget = () => {

    const [expended, setExpended] = useState(false);

    const [manifests, setManifests] = useState<Array<M3U8>>([]);

    useEffect(() => {

        chrome.runtime.onMessage.addListener((message) => {

            setManifests((old) => {
                return [...old, message];
            })
        });

    }, [setManifests]);

    const lead = useMemo(() => manifests[0], [manifests]);
    const others = useMemo(() => manifests.slice(1), [manifests]);

    return (
        <div className="fixed top-1/4 right-0 w-1/4 bg-slate-100 text-black rounded-xl border-black border-2 m-4 p-3">

            {lead
                ? <>

                    <Playable {...lead} />

                    {others.length ? <>

                        <section className="flex justify-center px-4 py-3">
                            <button className="flex items-center" onClick={() => {
                                setExpended(!expended);
                            }}>
                                <span className="text-sm mr-3">show more</span>
                                {expended
                                    ? <ArrowUpIcon className="h-4 w-4" />
                                    : <ArrowDownIcon className="h-4 w-4" />
                                }
                            </button>
                        </section>

                        <section hidden={expended == false}>
                            {others.map((manifest) => {

                                return <div key={manifest.url} className="w-full m-2">
                                    <Playable {...manifest} />
                                </div>;
                            })}
                        </section>


                    </> : null}
                </>
                : <span>
                    Play something
                </span>}
        </div>
    )
};

const Playable = (m3u8: M3U8) => {

    return <div className="flex flex-row gap-4 justify-between px-4 py-3 border-solid">

        <span className="text-ellipsis overflow-hidden">{m3u8.initiator}</span>

        <button title="play" type="button" onClick={async () => {
            alert(m3u8.url);
        }}>
            <PlayIcon className="w-5 h-5" />
        </button>
    </div>;
}

export default Widget;
