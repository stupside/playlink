import { RefObject, createContext } from "react";

interface IVideoControllerContext {
    portal: RefObject<HTMLDivElement>,
    controller: RefObject<HTMLDivElement>,
    visible: boolean,
    open: () => void,
    close: () => void
}

const VideoControllerContext = createContext<IVideoControllerContext>({} as IVideoControllerContext);

export default VideoControllerContext;