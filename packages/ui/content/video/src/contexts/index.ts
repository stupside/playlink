import { type RefObject, createContext } from "react";

import VideoAudioContext from "./VideoAudioContext";
import VideoOverlayContext from "./VideoOverlayContext";
import VideoQualityContext from "./VideoQualityContext";
import VideoSubtitleContext from "./VideoSubtitleContext";

export interface IVideoContext {
  url: string;
  video: RefObject<HTMLVideoElement>;
  player: RefObject<HTMLDivElement>;
}

export const VideoContext = createContext<IVideoContext>({} as IVideoContext);

export {
  VideoAudioContext,
  VideoOverlayContext,
  VideoQualityContext,
  VideoSubtitleContext,
};
