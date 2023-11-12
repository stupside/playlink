import { FC, PropsWithChildren } from "react";

import { createPortal } from "react-dom";

import useVideoController from "../Contexts/hooks/useVideoController";

const VideoDialog: FC<PropsWithChildren> = ({ children }) => {
  const { overlay } = useVideoController();

  if (overlay.current === null) return null;

  return createPortal(
    <div id={"dialog"} className="absolute flex p-5 rounded-lg bg-white">
      {children}
    </div>,
    overlay.current
  );
};

export default VideoDialog;
