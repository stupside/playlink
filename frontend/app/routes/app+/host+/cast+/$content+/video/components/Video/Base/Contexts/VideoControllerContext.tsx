import { RefObject, createContext } from "react";

interface IVideoControllerContext {
  visible: boolean;
  open: () => void;
  close: () => void;
  overlay: RefObject<HTMLDivElement>;
  controller: RefObject<HTMLDivElement>;
}

const VideoControllerContext = createContext<IVideoControllerContext>(
  {} as IVideoControllerContext
);

export default VideoControllerContext;
