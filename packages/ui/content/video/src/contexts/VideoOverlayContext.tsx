import { createContext } from "react";

export interface IVideoOverlayContext {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

const VideoOverlayContext = createContext<IVideoOverlayContext>(
  {} as IVideoOverlayContext,
);

export default VideoOverlayContext;
