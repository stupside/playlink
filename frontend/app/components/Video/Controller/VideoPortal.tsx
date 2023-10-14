import { FC, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import useVideoController from "~/hooks/video/useVideoController";

const VideoPortal: FC<PropsWithChildren> = ({ children }) => {

    const { portal } = useVideoController();

    return <>
        {portal.current && createPortal(<div className="absolute top-0 left-0">
            <div className="flex p-4 gap-3 bg-white rounded-lg">
                {children}
            </div>
        </div>, portal.current)}
    </>;
};

export default VideoPortal;