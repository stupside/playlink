import { RefObject, createContext, useCallback, useContext, useRef, useState } from "react";

interface IVideoContext {
    url: string,
    video: RefObject<HTMLVideoElement>,
    player: RefObject<HTMLDivElement>,
}

const VideoContext = createContext<IVideoContext>({} as IVideoContext);

const timeout = 5;

export const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ url, children }: { url: string, children: React.ReactNode }) => {

    const video = useRef<HTMLVideoElement>(null);
    const player = useRef<HTMLDivElement>(null);

    const [showControls, setShowControls] = useState(false);

    const controlsTimeout = useRef<NodeJS.Timeout>();

    const onLeaveControls = useCallback(() => {

        clearTimeout(controlsTimeout.current);

        setShowControls(false);

    }, [setShowControls, controlsTimeout.current]);

    const delayCloseControls = useCallback(() => {

        clearTimeout(controlsTimeout.current);

        controlsTimeout.current?.refresh();

        setShowControls(true);

        controlsTimeout.current = setTimeout(() => {

            setShowControls(false);
        }, timeout * 1000);

    }, [setShowControls, controlsTimeout.current, timeout]);

    return <div ref={player} className="relative flex flex-grow justify-center">

        <video
            src={url}
            className="max-h-screen cursor-none"
            ref={video}
            onMouseMove={delayCloseControls}
        />

        <VideoContext.Provider value={{
            url,
            video,
            player,
        }}>
            <div
                id="controls"
                hidden={showControls === false}
                className="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent cursor-auto select-none"
                onMouseMove={delayCloseControls}
                onMouseLeave={onLeaveControls}
            >
                {children}
            </div>
        </VideoContext.Provider>
    </div>
};

export default VideoProvider;