import { RefObject, createContext, useRef } from "react";

interface IVideoContext {
    url: string,
    video: RefObject<HTMLVideoElement>,
    player: RefObject<HTMLDivElement>,
}

export const VideoContext = createContext<IVideoContext>({} as IVideoContext);

const VideoProvider = ({ url, children }: { url: string, children: React.ReactNode }) => {

    const video = useRef<HTMLVideoElement>(null);
    const player = useRef<HTMLDivElement>(null);

    return <div ref={player} className="relative flex flex-grow justify-center">

        <video
            src={url}
            className="max-h-screen cursor-none w-full"
            ref={video}
        />

        <VideoContext.Provider value={{
            url,
            video,
            player,
        }}>
            {children}
        </VideoContext.Provider>
    </div>
};

export default VideoProvider;