import { FC, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import useVideoController from "~/hooks/video/useVideoController";

const VideoPortal: FC<PropsWithChildren> = ({ children }) => {

    const { portal } = useVideoController();

    return <>
        {portal.current && createPortal(<>
            <div className="flex p-4 gap-3 rounded-lg mb-12 bg-white">
                {children}
            </div>
        </>, portal.current)}
    </>;
};

export default VideoPortal;